import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { chatRooms } from '@/components/chatrooms';

const Page: NextPage = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Head></Head>
      <AuthGuard>
        {user ? <p>{user.displayName}さん、ようこそ！</p> : <p>ログアウト状態です</p>}
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
      </AuthGuard>
    </>
  );
};

export default Page;
