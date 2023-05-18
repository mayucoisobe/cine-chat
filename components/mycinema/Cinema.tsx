import { useState } from 'react';
import axios from 'axios';
import { Search } from './Search';
import { Result } from './Result';

type Movie = {
  id: number;
  name: string;
  original_title: string;
  original_name: string;
  poster_path: string;
};

const MOVIE_API_URL =
  'https://api.themoviedb.org/3/search/movie?api_key=a8063e5f47a60daac25dbb25e7c45a4b';

export const Cinema = ({ movie }: Movie): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const search = (searchValue: string) => {
    setLoading(true);
    setErrorMessage(null);

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${MOVIE_API_URL}&query=${searchValue}&language=en-ja`
        );
        console.log(res.data.results);
        setMovies(res.data.results);
        setLoading(false);
      } catch (error) {
        setErrorMessage('データの取得に失敗しました');
        setLoading(false);
      }
    };
    fetchData();
  };

  return (
    <>
      <Search search={search} />
      <p>映画を探す</p>
      <div>
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Result key={`${index}-${movie.title}`} movie={movie} />
          ))
        )}
      </div>
    </>
  );
};

// https://api.themoviedb.org/3/search/movie?api_key=a8063e5f47a60daac25dbb25e7c45a4b&query=Jack+Reacher
// これで各作品のidが取得できるので、movie?の箇所にidを入れてdetail を見たりとかできるぽい？
// https://api.themoviedb.org/3/movie/343611?api_key=a8063e5f47a60daac25dbb25e7c45a4b
