import Link from 'next/link';
import { ModalRecord } from './ModalRecord';

type Props = {
  title: string;
  name: string;
  poster_path: string;
  release_date: string;
  first_air_date: string;
  vote_average: number;
  id: number;
};

const defalutImg = 'https://source.unsplash.com/random/600x400/?cinema';

export const Result = ({ movie, type }: Props): JSX.Element => {
  const poster =
    movie.poster_path === null
      ? defalutImg
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div>
      <h2>
        {movie.title}
        {movie.name}
      </h2>
      <p>
        {movie.release_date}
        {movie.first_air_date}
      </p>
      <p>{movie.vote_average}</p>
      <a
        href={`https://www.themoviedb.org/${type}/${movie.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        details
      </a>
      <div>
        <img
          width="150"
          alt={`The movie titled: ${movie.title}`}
          src={poster}
        />
        <ModalRecord poster={poster} title={movie.title} />
      </div>
    </div>
  );
};
