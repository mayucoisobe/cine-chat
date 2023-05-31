import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
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
  const title = `${props.id}-room`;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} key="ogtitle" />
      </Head>
      <Box bg="brand.100" color="white">
        <Container>
          <Heading fontSize="2xl" align="center" py={8}>
            {props.id}
            {/* <Text as="span" fontSize="sm">
            ルーム
          </Text> */}
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
    </>
  );
};

export default ChatRoomPage;
