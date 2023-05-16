import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useAuthContext } from '@/providers/AuthProvider';
import { Header } from '@/components/Header';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';

export default function Tweet(): JSX.Element {
  const { user } = useAuthContext();
  const [twtext, setTwtext] = useState<string>('');
  const twTextWriting = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwtext(e.target.value);
  };

  const sendPost = async () => {
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

  const [getTweet, setGetTweet] = useState<Tweet[]>([]);
  useEffect(() => {
    const q = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const tweets = [];
      snapshot.forEach((doc) => {
        tweets.push({ id: doc.id, ...doc.data() });
      });
      setGetTweet(tweets);
      console.log(tweets);
      console.log(getTweet);
    });

    return () => {
      unsub();
    };
  }, []);

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
        <title>Chat</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="home">
        <h1>Tweet24</h1>
        {/* {twtext} */}
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
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
        <p>
          <input
            onChange={twTextWriting}
            type="text"
            placeholder="Lets Tweet!"
          />
        </p>
        <p>
          <button onClick={sendPost}>Tweetする</button>
        </p>
      </div>
    </div>
  );
}
