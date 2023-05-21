import Image from 'next/image';
import { StarIcon } from '@chakra-ui/icons';
import { CinemaInput } from './CinemaInput';

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

  console.log(title, date);

  return (
    <div>
      <h2>{title}</h2>
      <p> {date}</p>
      <p>
        <StarIcon color="yellow.300" />
        {Math.round(movie.vote_average * 10) / 10}
      </p>
      <a href={`https://www.themoviedb.org/${type}/${movie.id}`} target="_blank" rel="noopener noreferrer">
        <Image width="150" height="225" alt={`${movie.title}`} src={poster} />
      </a>
      <CinemaInput poster={poster} movie={movie} type={type} title={title} />
    </div>
  );
};
