import Image from 'next/image';
import {
  Button,
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

type Props = {
  title: string;
  name: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  id: number;
};

const defaultImg = 'https://source.unsplash.com/random/300x450/?cinema';

export const SearchResult = ({ movie, type }: Props): JSX.Element => {
  const poster = movie.poster_path === null ? defaultImg : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title = type === 'movie' ? movie.title : type === 'tv' ? movie.name : '';
  const date = type === 'movie' ? movie.release_date : type === 'tv' ? movie.first_air_date : '';
  const voteAverage = (Math.round(movie.vote_average * 10) / 10) * 10;
  console.log(title, date, movie, voteAverage);

  return (
    <div>
      <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
        <a href={`https://www.themoviedb.org/${type}/${movie.id}`} target="_blank" rel="noopener noreferrer">
          <Image width="150" height="225" alt={`${movie.title}`} src={poster} />
        </a>
        <Stack>
          <CardBody>
            <Heading size="md">{title}</Heading>
            <Text py="2">{date}</Text>
            <Flex align="center">
              <Icon as={AiFillStar} w={6} h={6} mr={1} color="yellow.400" />
              <Text>人気スコア</Text>
              <CircularProgress value={voteAverage} color="orange.400" size="60px" thickness="6px">
                <CircularProgressLabel>{voteAverage}%</CircularProgressLabel>
              </CircularProgress>
            </Flex>
          </CardBody>
          <CardFooter>
            <InputModal poster={poster} movie={movie} type={type} title={title} />
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};
