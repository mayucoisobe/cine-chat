type Props = {
  title: string;
  poster_path: string;
  release_date: string;
};

const defalutImg = 'https://source.unsplash.com/random/600x400/?cinema';

export const Result = ({ movie }: Props): JSX.Element => {
  const poster = movie.poster_path === 'N/A' ? defalutImg : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  return (
    <div className="movie">
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <div>
        {/* <img width="150" alt={`The movie titled: ${movie.title}`} src={`https://image.tmdb.org/t/p/w500${poster}`} /> */}
        <img width="150" alt={`The movie titled: ${movie.title}`} src={poster} />
      </div>
    </div>
  );
};
