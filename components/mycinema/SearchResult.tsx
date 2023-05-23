import Image from 'next/image';
import {
  Stack,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Button,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FaGrinStars } from 'react-icons/fa';
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
  const poster =
    movie.poster_path === null
      ? defaultImg
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const title =
    type === 'movie' ? movie.title : type === 'tv' ? movie.name : '';
  const date =
    type === 'movie'
      ? movie.release_date
      : type === 'tv'
      ? movie.first_air_date
      : '';

  console.log(title, date);

  return (
    <div>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
      >
        <a
          href={`https://www.themoviedb.org/${type}/${movie.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image width="150" height="225" alt={`${movie.title}`} src={poster} />
        </a>
        <Stack>
          <CardBody>
            <Heading size="md">{title}</Heading>
            <Text pt="2">{date}</Text>
            <Text>
              review
              <Icon as={FaGrinStars} w={5} h={5} color="green.400" />
              {Math.round(movie.vote_average * 10) / 10}
            </Text>
          </CardBody>
          <CardFooter>
            <InputModal
              poster={poster}
              movie={movie}
              type={type}
              title={title}
            />
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
};

{
  /* <h2>{title}</h2>
      <p> {date}</p>
      <p>
        review
        <StarIcon color="yellow.300" />
        {Math.round(movie.vote_average * 10) / 10}
      </p>
      <a
        href={`https://www.themoviedb.org/${type}/${movie.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image width="150" height="225" alt={`${movie.title}`} src={poster} />
      </a>
      <InputModal poster={poster} movie={movie} type={type} title={title} /> */
}
