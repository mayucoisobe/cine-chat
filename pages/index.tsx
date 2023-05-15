import Head from 'next/head';
import type { NextPage } from 'next';
import { Box, Heading, Button } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { IsAuthContext } from '@/providers/IsAuthProvider';
import Header from '@/components/Header';

import { collection, query, onSnapshot, getDocs, doc, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase';

const Page: NextPage = () => {
  const { isAuth, setIsAuth } = useContext(IsAuthContext);
  console.log('HOME最初' + isAuth);
  const [getTweet, setGetTweet] = useState([]);

  useEffect(() => {
    // 変更があるたびに自動更新
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const cloneGetTweet = [...getTweet];
        const q = query(collection(db, 'tweets'), orderBy('createdAt', 'desc'));
        onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // console.log(change.doc.data());
            if (change.type === 'added') {
              const editedData = { ...change.doc.data(), id: change.doc.id };
              cloneGetTweet.push(editedData);
              setGetTweet(cloneGetTweet);
            }
          });
        });
      }
    });
  }, []);

  return (
    <>
      <Head></Head>
      <Header />
      <Box>
        <Heading>24h chat</Heading>
      </Box>
      <main>
        <div>
          <div>
            {isAuth &&
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
    </>
  );
};

export default Page;
