import Image from 'next/image';
import {
  Avatar,
  Button,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import styles from '../../styles/cinemaList.module.css';

import { BiMoviePlay } from 'react-icons/bi';
import { RiMovie2Fill } from 'react-icons/ri';
import { useAuthContext } from '@/providers/AuthProvider';
import { getLists } from './sendGetList';
import { StarRating } from './StarRating';
import { DeleteModal } from './DeleteModal';
import { UpdateModal } from './UpdateModal';

export const CinemaList = (): JSX.Element => {
  const { user } = useAuthContext();
  const myLists = getLists(user);
  console.log(myLists, user);

  return (
    <Container maxW="md">
      <>
        {myLists.length === 0 && <Text>まだマイリストがありません</Text>}
        {myLists.length !== 0 && (
          <Box
            borderColor="brand.100"
            borderTopWidth="16px"
            borderBottomWidth="16px"
            className={`${styles.cinelist} myroom`}
          >
            <Card maxW="md" bg="brand.200" color="brand.100" p={2} borderRadius="xl">
              <Center
                // bg="brand.200"
                // borderColor="brand.100"
                // borderTopWidth="16px"
                // borderBottomWidth="16px"
                pos="relative"
                w="100%"
              >
                <Box className={styles.cross}></Box>
                <Box
                  border="4px"
                  borderColor="brand.100"
                  pt="70%"
                  borderRadius="full"
                  w="70%"
                  className={styles.round}
                ></Box>
              </Center>
              <Heading as="h1" align="center" lineHeight="none" size="lg" pos="absolute" className={styles.centerPo}>
                {user.displayName}
                <br></br>
                <Text as="span" fontSize="12px">
                  さんの
                </Text>
                <br></br>myroom
              </Heading>
            </Card>
          </Box>
        )}
        {myLists.length !== 0 &&
          myLists.map((list, index) => {
            return (
              <Box
                borderColor="brand.100"
                borderTopWidth="16px"
                borderBottomWidth="16px"
                className={`${styles.cinelist} myroom`}
              >
                <Card
                  direction="row"
                  maxW="md"
                  key={index}
                  bg="brand.200"
                  gap={3}
                  justify="space-between"
                  px={2}
                  borderRadius="xl"
                >
                  <Box pos="relative" w="50%">
                    <Image
                      alt={list.title}
                      src={list.src}
                      fill
                      sizes="100vw"
                      style={{
                        objectFit: 'contain',
                      }}
                    />
                  </Box>
                  <Stack w="50%">
                    <CardBody p={0}>
                      <Heading size="sm" color="brand.300">
                        {list.title}
                      </Heading>
                      <StarRating value={list.star} />
                      <Text className={styles.tec}>{list.text}</Text>
                    </CardBody>
                    <CardFooter
                      justify="space-between"
                      flexWrap="wrap"
                      sx={{
                        '& > button': {
                          minW: '45px',
                        },
                      }}
                      px={0}
                    >
                      <Button
                        leftIcon={<BiMoviePlay />}
                        // colorScheme="green"
                        variant="solid"
                        as="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`https://www.themoviedb.org/${list.type}/${list.id}`}
                        // style={{ background: 'var(--tertiary-color)' }}
                      >
                        詳細
                      </Button>
                      {/* <Button>Share</Button> */}
                      <UpdateModal flex="1" user={user} list={list} />
                      <DeleteModal flex="1" user={user} list={list} />
                    </CardFooter>
                  </Stack>
                </Card>
              </Box>
            );
          })}
      </>
    </Container>
  );
};

// <Box key={index} className="myroom">
//   <Text>{list.title}</Text>
//   <Image width="150" height="225" alt={list.title} src={list.src} />
//   <StarRating value={list.star} />
//   <Text>{list.text}</Text>
//   <Button
//     leftIcon={<BiMoviePlay />}
//     colorScheme="green"
//     variant="solid"
//     as="a"
//     target="_blank"
//     rel="noopener noreferrer"
//     href={`https://www.themoviedb.org/${list.type}/${list.id}`}
//   >
//     詳細
//   </Button>
//   <UpdateModal user={user} list={list} />
//   <DeleteModal user={user} list={list} />
// </Box>
