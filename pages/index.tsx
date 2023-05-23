import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { Box, Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { chatRooms } from '@/components/chatrooms';

const Page: NextPage = () => {
  const { user } = useAuthContext();

  console.log(chatRooms);

  return (
    <>
      <Head></Head>
      <AuthGuard>
        {user ? (
          <Text>{user.displayName}さん、ようこそ！</Text>
        ) : (
          <Text>ログアウト状態です</Text>
        )}
        <Box>
          <Heading> ALL ROOMS </Heading>
          <Flex wrap="wrap" rowGap={5}>
            {chatRooms.map((room) => (
              <Box key={room.id} w="50%">
                <Link href={`/room/${room.id}`}>
                  <Card>
                    <CardBody>
                      <Text>{room.title}</Text>
                    </CardBody>
                  </Card>
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>
      </AuthGuard>
    </>
  );
};

export default Page;
