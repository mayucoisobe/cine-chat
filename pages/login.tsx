import Head from 'next/head';
import { useRouter } from 'next/router';
import { AbsoluteCenter, Button, Box, Center, Container, Heading, Image, Text } from '@chakra-ui/react';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../firebase';
import { HeadMeta } from '@/components/organisms/HeadMeta';

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
      <HeadMeta
        title={'Login | cinemyroom'}
        description={'cinemyroomのログインページです。'}
        url={'https://cinemyroom.vercel.app/login'}
        type={'article'}
      />
      <Box bg="brand.100" color="white">
        <Container>
          <Box position="relative" height={`calc(100vh - 80px)`}>
            <AbsoluteCenter>
              <Center>
                <Heading as="h1" mb={5}>
                  ログイン
                </Heading>
              </Center>
              <Button
                onClick={loginWithGoogle}
                variant="outline"
                py={6}
                fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
                _hover={{ color: 'brand.100', backgroundColor: 'white' }}
              >
                <Image boxSize="20px" objectFit="cover" alt="google" mx={3} src="/google-icon.svg"></Image>
                <Text mr={3}>Googleアカウントでログインする</Text>
              </Button>
            </AbsoluteCenter>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
