import Head from 'next/head';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Box, Card, CardBody, Container, Flex, Heading, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { chatRooms } from '@/components/chatRooms';
import Splash from '@/components/Splash';

const Page: NextPage = () => {
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3 * 1000);
  }, []);

  console.log(chatRooms);

  return (
    <>
      <Head></Head>
      {isLoading ? (
        <Splash />
      ) : (
        <AuthGuard>
          <Box bg="brand.100">
            <Container>
              {user ? <Text>{user.displayName}さん、ようこそ！</Text> : <Text>ログアウト状態です</Text>}
              <Box>
                <Heading> ALL ROOMS </Heading>
                <Wrap spacingY={{ base: '10%', md: '5%' }} spacingX="5%" justify="space-between">
                  {chatRooms.map((room) => (
                    <WrapItem key={room.id} m="0px" w="45%">
                      <Link href={`/room/${room.id}`} className="width100">
                        <Card className="neon">
                          <CardBody
                            p="16px"
                            display={{ md: 'flex' }}
                            alignItems={{ md: 'center' }}
                            gap={{ md: '1rem' }}
                          >
                            <Flex pos="relative" direction="column" alignItems="center" w={{ md: '45%' }}>
                              <Image
                                boxSize={{ base: '110px', sm: '120px', md: '130px' }}
                                objectFit="contain"
                                alt="frame-room"
                                src="/frame-room.svg"
                              ></Image>
                              <Text
                                color="white"
                                fontSize={{ base: 'sm', sm: 'md' }}
                                fontWeight="medium"
                                pos="absolute"
                                top={{ base: '48%', md: '48%' }}
                                left="50%"
                                className="transformX50"
                              >
                                {room.title}
                              </Text>
                              <Text
                                color="white"
                                fontSize={{ base: 'xs', sm: 'sm' }}
                                fontWeight="medium"
                                pos="absolute"
                                top={{ base: '70%', sm: '70%' }}
                                left="50%"
                                className="transformX50"
                              >
                                {room.subtitle}
                              </Text>
                            </Flex>
                            <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} pt={3} w={{ md: '55%' }}>
                              {room.summary}
                            </Text>
                          </CardBody>
                        </Card>
                      </Link>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            </Container>
          </Box>
        </AuthGuard>
      )}
    </>
  );
};

export default Page;

{
  /* <Image
boxSize="100px"
objectFit="cover"
alt="google"
src="/frame-room.svg"
mr={2}
// alt="frame"
// src={list.src}
// width={500}
// height={750}
// sizes="100vw"
// style={{
//   width: '100%',
//   height: 'auto',
// }}
></Image> */
}
