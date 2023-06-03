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
        <Box
          borderColor="brand.100"
          borderTopWidth="16px"
          borderBottomWidth="16px"
          bgSize={{ base: '12vw', sm: '3.9rem' }}
          px={{ base: '12vw', sm: '3.9rem' }}
          className={`${styles.cinelist} myroom`}
        >
          <Card
            bg="brand.200"
            borderRadius="xl"
            color="brand.100"
            maxW="md"
            p={{ base: '.5rem', sm: '.5rem' }}
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
                pt={{ base: '70%', sm: '75%' }}
                w={{ base: '70%', sm: '75%' }}
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
        {myLists.length === 0 && (
          <Text align="center" mt={10}>
            まだリストがありません
          </Text>
        )}
        {myLists.length !== 0 &&
          myLists.map((list, index) => {
            return (
              <Box
                borderColor="brand.100"
                borderTopWidth="16px"
                borderBottomWidth="16px"
                bgSize={{ base: '12vw', sm: '3.9rem' }}
                px={{ base: '12vw', sm: '3.9rem' }}
                className={`${styles.cinelist} myroom`}
              >
                <Card
                  key={index}
                  bg="brand.200"
                  borderRadius="xl"
                  direction="row"
                  gap={3}
                  justify="space-between"
                  maxW="md"
                  px={2}
                  py={4}
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
                      }}
                      // fill
                      // sizes="100vw"
                      // style={{
                      //   objectFit: 'contain',
                      // }}
                    ></Image>
                    <Button
                      // as="a"
                      bottom={0}
                      left={0}
                      variant="solid"
                      opacity="0.8"
                      p={0}
                      pos="absolute"
                      // rel="noopener noreferrer"
                      // target="_blank"
                      // href={`https://www.themoviedb.org/${list.type}/${list.id}`}
                    >
                      <Icon as={RiMovie2Line} w={5} h={5} />
                    </Button>
                  </Box>
                  <Stack w="50%">
                    <CardBody p={0}>
                      <Heading size="sm" color="brand.300" mb={1} className={styles.tec2}>
                        {list.title}
                      </Heading>
                      <StarRating value={list.star} size={14} />
                      <Text fontSize="xs" pt={1} className={styles.tec2}>
                        {list.text}
                      </Text>
                    </CardBody>
                    <CardFooter
                      // justify="space-between"
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
