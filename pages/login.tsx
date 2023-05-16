import Head from 'next/head';
import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import {
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();
// Ts: JSX.Element,Promise<void>,UserCredential
export default function Login(): JSX.Element {
  const { push } = useRouter();
  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { user }: UserCredential = await signInWithPopup(auth, provider);
      push('/');
      console.log({ uid: user.uid, displayName: user.displayName });
    } catch (error) {
      if (error instanceof FirebaseError) {
      }
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div>
        <h1>ログインページ</h1>
        <button onClick={loginWithGoogle}>Googleアカウントでログイン</button>
      </div>
    </div>
  );
}
