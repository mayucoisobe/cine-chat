import Head from 'next/head';
// import Link from 'next/link';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Box, Card, CardBody, Container, Flex, Heading, Link, Image, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useAuthContext } from '@/providers/AuthProvider';
import { AuthGuard } from '@/feature/auth/AuthGuard';
import { chatRooms } from '@/components/chatRooms';
// gsapアニメーション
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline();

const Page: NextPage = () => {
  const { user } = useAuthContext();
  console.log(chatRooms);

  useEffect(() => {
    ScrollTrigger.batch('#card', {
      onEnter: (batch) =>
        tl
          .to(batch, {
            autoAlpha: 1,
            stagger: 0.15,
            overwrite: true,
            ease: 'power2.out',
            boxShadow: 'inset 0 0 0 rgba(255, 255, 255, 0.3), 0 0 1.2em rgba(255, 255, 255, 0.8)',
          })
          .to(batch, {
            boxShadow: 'inset 0 0 0 rgba(255, 255, 255, 0.2), 0 0 1.2em rgba(255, 255, 255, 0.4)',
          }),
      onLeave: (batch) =>
        gsap.set(batch, {
          autoAlpha: 0,
          overwrite: true,
        }),
      onEnterBack: (batch) => gsap.to(batch, { autoAlpha: 1, stagger: 0.1, overwrite: true }),
      onLeaveBack: (batch) => gsap.set(batch, { autoAlpha: 0, overwrite: true }),
      // once: true,
      // markers: true,
    });
  }, []);

  return (
    <>
      <Head></Head>
      <AuthGuard>
        <Box bg="brand.100">
          <Container px={{ base: '4', sm: '6' }}>
            {user ? <Text>{user.displayName}さん、ようこそ！</Text> : <Text>ログアウト状態です</Text>}
            <Box>
              <Heading> ALL ROOMS </Heading>
              <Wrap spacingY={{ base: '15%', sm: '10%', md: '5%' }} spacingX="5%" justify="space-between">
                {chatRooms.map((room) => (
                  <WrapItem key={room.id} m="0px" w="45%" flexDirection="column">
                    <Link href={`/room/${room.id}`} className="width100" display="block" flex="1 auto">
                      <Card id="card" className="neon" height="100%">
                        <CardBody p="16px" display={{ md: 'flex' }} alignItems={{ md: 'center' }} gap={{ md: '1rem' }}>
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
    </>
  );
};

export default Page;
