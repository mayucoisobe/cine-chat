import Image from 'next/image';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AiFillStar } from 'react-icons/ai';
import { InputModal } from './InputModal';
import type { MovieProps } from './CinemaSearch';

type Props = {
  movie: MovieProps;
  type: string;
};

const defaultImg = 'https://source.unsplash.com/random/500x750/?cinema';
const defaultImgBg = 'https://source.unsplash.com/random/1920x800/?cinema';

export const SearchResult = ({ movie, type }: Props): JSX.Element => {
  const poster = movie.poster_path === null ? defaultImg : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const posterbg =
    movie.backdrop_path === null
      ? defaultImgBg
      : `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path}`;
  const title = type === 'movie' ? movie.title : type === 'tv' ? movie.name : '';
  const date = type === 'movie' ? movie.release_date : type === 'tv' ? movie.first_air_date : '';
  const voteAverage = (Math.round(movie.vote_average * 10) / 10) * 10;
  console.log(title, date, movie, voteAverage);

  return (
    <Box pt={5}>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        alignItems={{ sm: 'center' }}
        overflow="hidden"
        variant="outline"
        color="white"
        bg="linear-gradient(180deg,#1d1f20,#010601 65.62%)"
        borderColor="white"
        borderWidth="1px"
        borderStyle="solid"
      >
        <Box p={5} minW="180px">
          <a href={`https://www.themoviedb.org/${type}/${movie.id}`} target="_blank" rel="noopener noreferrer">
            <Image
              width="150"
              height="225"
              alt={`${movie.title}`}
              src={poster}
              style={{
                borderRadius: '.5rem',
              }}
            />
          </a>
        </Box>
        <Stack>
          <CardBody py={{ base: '0', sm: '5' }}>
            <Heading fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>{title}</Heading>
            <Text fontSize={{ base: 'sm', sm: 'md' }} py={{ base: '1', sm: '2' }}>
              {date}
            </Text>
            <Flex align="center">
              <Icon as={AiFillStar} w={6} h={6} mr={1} color="yellow.400" />
              <Text pr={2}>人気スコア</Text>
              <CircularProgress value={voteAverage} color="orange.400" size="55px" thickness="6px">
                <CircularProgressLabel>{voteAverage}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </CardBody>
          <CardFooter pt={{ base: '0' }}>
            <InputModal poster={poster} posterbg={posterbg} movie={movie} type={type} title={title} />
          </CardFooter>
        </Stack>
      </Card>
    </Box>
  );
};
