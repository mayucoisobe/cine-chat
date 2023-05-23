import Head from 'next/head';
import { useRouter } from 'next/router';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';
import { Button, Center, Container, Image, Heading } from '@chakra-ui/react';

export default function Login(): JSX.Element {
  const { push } = useRouter();
  const provider = new GoogleAuthProvider();

  const loginWithGoogle = async (): Promise<void> => {
    try {
      const { user }: UserCredential = await signInWithPopup(auth, provider);
      push('/');
      console.log({ uid: user.uid, displayName: user.displayName });
      console.log(user);
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
      <Container>
        <Center>
          <Heading as="h1">ログイン</Heading>
        </Center>

        <Button onClick={loginWithGoogle} variant="outline" py={6}>
          <Image boxSize="20px" objectFit="cover" alt="google" src="/google-icon.svg" mr={2}></Image>
          Googleアカウントでログインする
        </Button>
      </Container>
    </div>
  );
}
