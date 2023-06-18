import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { HeadMeta } from '@/components/organisms/HeadMeta';
import { MessageInput } from '../../components/MessageInput';
import { MessageList } from '../../components/MessageList';
// import { useRouter } from 'next/router';

// ページコンポーネントの引数の型定義
type StatusPageProps = { id: string };

// サーバーサイドでの前処理を行う関数
export const getServerSideProps: GetServerSideProps<StatusPageProps> = async (context) => {
  // context経由でブラウザから送信されたパラメーターを受け取る
  const { id } = context.query;

  // 受け取ったパラメーターが意図した型でなければnotfoundページとして処理する
  if (typeof id !== 'string') {
    return { notFound: true };
  }
  return { props: { id } };
};

const ChatRoomPage: NextPage<StatusPageProps> = (props) => {
  const roomId = `${props.id}-room`;
  return (
    <>
      {/* <Head>
        <title>{roomId}</title>
        <meta property="og:title" content={title} key="ogtitle" />
      </Head> */}
      <HeadMeta title={`${roomId} | cinemyroom`} description={`${roomId}のチャットルームページです。`} />
      <AuthGuard>
        <Box bg="brand.100" color="white">
          <Container minHeight="calc(100vh - 80px)" px={{ base: '4', sm: '6' }}>
            <Heading
              fontSize={{ base: '5xl', sm: '6xl', md: '7xl' }}
              textAlign="center"
              py={8}
              color="transparent"
              letterSpacing="wider"
              style={{ WebkitTextStroke: '1.5px white' }}
            >
              {props.id}
            </Heading>
            <Box>
              <Text>
                <Link href="/">← Back to home</Link>
              </Text>
            </Box>
            <Box>
              <MessageList roomId={props.id} />
              <MessageInput roomId={props.id} />
            </Box>
          </Container>
        </Box>
      </AuthGuard>
    </>
  );
};

export default ChatRoomPage;
