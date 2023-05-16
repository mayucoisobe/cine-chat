import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { Header } from '@/components/Header';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { chatRooms } from '@/components/chatrooms';

// import {
//   collection,
//   query,
//   onSnapshot,
//   getDocs,
//   doc,
//   orderBy,
// } from 'firebase/firestore';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth, db } from '../firebase';

const Page: NextPage = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Head></Head>
      <Header />
      <AuthGuard>
        {user ? <p>ログイン状態</p> : <p>ログアウト状態</p>}
      </AuthGuard>
      <main>
        <div>
          <p>- ALL ROOMS -</p>
          <ul>
            {chatRooms.map((room) => (
              <li key={room.id}>
                <Link href={`/room/${room.id}`}>{room.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Page;
