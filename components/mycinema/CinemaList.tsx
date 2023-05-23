import Image from 'next/image';
import { Avatar, Button, Box, Card, CardHeader, CardBody, CardFooter, Flex, Text, Heading } from '@chakra-ui/react';
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
    <>
      {user && (
        <Heading as="h1" size="md">
          {user.displayName}さんのmyroom
        </Heading>
      )}
      {myLists.length === 0 && <Text>まだマイリストがありません</Text>}
      {myLists &&
        myLists.map((list, index) => {
          return (
            <Card maxW="md" key={index} className="myroom">
              <CardHeader>
                <Flex spacing="4">
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Box>
                      <Heading size="sm">{list.title}</Heading>
                      <StarRating value={list.star} />
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>
              <CardBody>
                <Text>{list.text}</Text>
              </CardBody>
              <Image objectFit="cover" width="150" height="225" alt={list.title} src={list.src} />
              <Button
                leftIcon={<BiMoviePlay />}
                colorScheme="green"
                variant="solid"
                as="a"
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.themoviedb.org/${list.type}/${list.id}`}
              >
                詳細
              </Button>
              <CardFooter
                justify="space-between"
                flexWrap="wrap"
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                {/* <Button flex="1">Like</Button>
                <Button flex="1">Comment</Button> */}
                <UpdateModal user={user} list={list} />
                <DeleteModal user={user} list={list} />
                <Button flex="1">Share</Button>
              </CardFooter>
            </Card>
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
          );
        })}
    </>
  );
};
