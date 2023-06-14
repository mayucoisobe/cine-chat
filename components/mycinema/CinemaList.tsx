import Image from 'next/image';
import {
  Button,
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import styles from '../../styles/cinemaList.module.css';

import { RiMovie2Line } from 'react-icons/ri';
import type { User } from '@firebase/auth';
import { useAuthContext } from '@/providers/AuthProvider';
import { useGetLists } from './sendGetList';
import { StarRating } from './StarRating';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';

export type ListProps = {
  docId: string;
  id: string;
  src: string;
  star: number;
  text: string;
  title: string;
  type: string;
};

export const CinemaList = (): JSX.Element => {
  const { user } = useAuthContext();
  const myLists = useGetLists(user as User);
  console.log(myLists, user);

  return (
    <Box bg="brand.200" pos="relative" minHeight="calc(100vh - 80px)">
      <Flex flexWrap="wrap" pos="fixed" top="80px" left="0" zIndex="10" h="calc(100vh - 80px)" w="full">
        {myLists.length !== 0 &&
          myLists.map((list: ListProps, index: number) => {
            return (
              <Box
                key={index}
                width={{ base: 'calc(100% / 3)', md: 'calc(100% / 4)', lg: 'calc(100% / 5)', xl: 'calc(100% / 7)' }}
              >
                <Image
                  alt={list.title}
                  src={list.src}
                  width={500}
                  height={750}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    opacity: '.3',
                  }}
                ></Image>
                <Box pos="absolute" top="0" left="0" h="100%" w="full" bg="#161515" mixBlendMode="hue"></Box>
              </Box>
            );
          })}
      </Flex>
      <Container maxW="xl" pos="relative" zIndex="200" pt="5vh" right={{ md: '12%', lg: '20%' }}>
        <>
          <Box
            borderColor="brand.100"
            borderTopWidth="32px"
            borderBottomWidth="16px"
            boxShadow="2xl"
            bgSize={{ base: '12vw', sm: '3.9rem' }}
            px={{ base: '12vw', sm: '3.9rem' }}
            className={`${styles.cinelist} myroom`}
          >
            <Card
              bg="brand.200"
              borderRadius="xl"
              color="brand.100"
              p={{ base: '2', sm: '5' }}
              pos="relative"
              overflow="hidden"
            >
              <Center w="100%">
                <Box className={styles.noisebg}></Box>
                <Box className={styles.cross}></Box>
                <Box
                  border="4px"
                  borderColor="brand.100"
                  borderRadius="full"
                  pt={{ base: '70%', sm: '60%' }}
                  w={{ base: '70%', sm: '60%' }}
                  className={styles.round}
                ></Box>
              </Center>
              <Heading
                as="h1"
                textAlign="center"
                lineHeight="none"
                size="lg"
                pos="absolute"
                className={styles.centerPo}
              >
                {user?.displayName}
                <br></br>
                <Text as="span" fontSize="12px">
                  さんの
                </Text>
                <br></br>myroom
              </Heading>
            </Card>
          </Box>
          {myLists.length === 0 && (
            <Text align="center" mt={10}>
              まだリストがありません
            </Text>
          )}
          {myLists.length !== 0 &&
            myLists.map((list: ListProps, index: number) => {
              return (
                <Box
                  key={index}
                  borderColor="brand.100"
                  borderTopWidth="16px"
                  borderBottomWidth="16px"
                  boxShadow="2xl"
                  bgSize={{ base: '12vw', sm: '3.9rem' }}
                  px={{ base: '12vw', sm: '3.9rem' }}
                  className={`${styles.cinelist} ${styles.mylist} myroom`}
                >
                  <Card
                    bg="brand.200"
                    borderRadius="xl"
                    direction="row"
                    justify="space-between"
                    gap={{ base: '3', sm: '6' }}
                    px={{ base: '2', sm: '5' }}
                    py={{ base: '4', sm: '5' }}
                  >
                    <Box
                      pos="relative"
                      w="50%"
                      as="a"
                      rel="noopener noreferrer"
                      target="_blank"
                      href={`https://www.themoviedb.org/${list.type}/${list.id}`}
                    >
                      <Image
                        alt={list.title}
                        src={list.src}
                        width={500}
                        height={750}
                        sizes="100vw"
                        style={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: '.5rem',
                        }}
                      ></Image>
                      <Button
                        w={{ base: '10', sm: '12' }}
                        h={{ base: '10', sm: '12' }}
                        bottom={0}
                        left={0}
                        variant="solid"
                        opacity="0.8"
                        p={0}
                        pos="absolute"
                      >
                        <Icon as={RiMovie2Line} w={5} h={5} />
                      </Button>
                    </Box>
                    <Stack w="50%">
                      <CardBody p={0}>
                        <Heading
                          fontSize={{ base: 'sm', sm: 'lg', md: '2xl' }}
                          color="brand.300"
                          mb={{ base: '1', sm: '3' }}
                          className={styles.tec2}
                        >
                          {list.title}
                        </Heading>
                        <StarRating value={list.star} isEdit={false} size={16} />
                        <Text fontSize={{ base: 'xs', sm: 'sm' }} pt={{ base: '1', sm: '3' }} className={styles.tec4}>
                          {list.text}
                        </Text>
                      </CardBody>
                      <CardFooter
                        flexWrap="wrap"
                        gap={2}
                        sx={{
                          '& > button': {
                            minW: '40px',
                          },
                        }}
                        px={0}
                        py={0}
                      >
                        <UpdateModal user={user as User} list={list} />
                        <DeleteModal user={user as User} list={list} />
                      </CardFooter>
                    </Stack>
                  </Card>
                </Box>
              );
            })}
        </>
      </Container>
    </Box>
  );
};
