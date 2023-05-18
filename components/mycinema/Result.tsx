type Props = {
  title: string;
  poster_path: string;
};

// type Movie = {
//   id: string;
//   name: string;
//   title: string;
//   original_name: string;
//   poster_path: string;
//   backdrop_path: string;
// };

const defalutImg = 'https://source.unsplash.com/random/600x400/?cinema';

export const Result = ({ movie }: Props): JSX.Element => {
  // const poster = movie.Poster === 'N/A' ? defalutImg : movie.Poster;
  return (
    <div className="movie">
      <h2>{movie.title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.title}`}
          // src={poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
      </div>
      {/* <p>({movie.Year})</p> */}
    </div>
  );
};
