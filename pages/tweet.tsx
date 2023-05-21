import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  // doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';
import { format, formatDistance } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function Tweet(): JSX.Element {
  const { user } = useAuthContext();
  const [twtext, setTwtext] = useState<string>('');
  const twTextWriting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwtext(e.target.value);
  };

  // チャットをfirebaseに追加
  const sendPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (auth.currentUser) {
      await addDoc(collection(db, 'tweets'), {
        createdAt: serverTimestamp(),
        twText: twtext,
        user: {
          name: auth.currentUser.displayName,
          id: auth.currentUser.uid,
          photoURL: auth.currentUser.photoURL,
        },
      });
      setTwtext('');
    }
  };

  type User = {
    name: string;
    id: string;
    photoURL: string;
  };

  type Tweet = {
    createdAt: string;
    twText: string;
    user: User;
  };

  // チャットデータをfirebaseから取得
  const [getTweet, setGetTweet] = useState<Tweet[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'tweets'), orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const tweets = [];
      snapshot.forEach((doc) => {
        tweets.push({ id: doc.id, ...doc.data() });
      });
      setGetTweet(tweets);
    });

    return () => {
      unsub();
    };
  }, [user]);

  // timestamp型のデータを変換;
  const time = (date: Timestamp | null) => {
    if (date) {
      let timestamp = formatDistance(new Date(), date.toDate(), {
        locale: ja,
      });
      if (timestamp.indexOf('未満') !== -1) {
        return (timestamp = 'たった今');
      } else {
        return (timestamp = timestamp + '前');
      }
    }
    return '';
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       const cloneGetTweet = [...getTweet];
  //       const q = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'));
  //       onSnapshot(q, (snapshot) => {
  //         snapshot.docChanges().forEach((change) => {
  //           // console.log(change.doc.data());
  //           if (change.type === 'added') {
  //             const editedData = { ...change.doc.data(), id: change.doc.id };
  //             cloneGetTweet.push(editedData);
  //             setGetTweet(cloneGetTweet);
  //           }
  //         });
  //       });
  //     }
  //   });
  // }, []);

  return (
    <div>
      <Head>
        <title>Tweet24</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="home">
        <h1>Tweet24</h1>
        <main>
          <div>
            <div>
              {user &&
                getTweet.map((tweet, index) => {
                  return (
                    <div key={index}>
                      <div>
                        <p>
                          <img src={tweet.user.photoURL} alt="" />
                        </p>
                        <p>@{tweet.user.name}</p>
                      </div>
                      <p>{tweet.twText}</p>
                      <span>{time(tweet.createdAt)}</span>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
        <form>
          <p>
            <Input onChange={twTextWriting} type="text" value={twtext} placeholder="Lets Tweet!" />
          </p>
          <p>
            <Button onClick={sendPost} type="submit">
              Tweetする
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
