import type { GetServerSideProps, NextPage } from 'next';
import { RouteModule } from 'next/dist/server/future/route-modules/route-module';
import Head from 'next/head';
import Link from 'next/link';
import { MessageInput } from '../../components/MessageInput';
import { MessageList } from '../../components/MessageList';
// import { useRouter } from 'next/router';

// ページコンポーネントの引数の型定義
type StatusPageProps = { id: string };

// サーバーサイドでの前処理を行う関数
export const getServerSideProps: GetServerSideProps<StatusPageProps> = async (
  context
) => {
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
      <h2>{props.id}の部屋</h2>
      <div>
        <Link href="/">← Back to home</Link>
      </div>
      <div>
        <MessageList roomId={props.id} />
        <MessageInput roomId={props.id} />
      </div>
    </>
  );
};

export default ChatRoomPage;
