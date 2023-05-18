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
  isLargeRow?: boolean;
};

const API_KEY = 'a8063e5f47a60daac25dbb25e7c45a4b';
const MOVIE_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ja-JP`;
const TV_API_URL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=ja-JP`;

export const Cinema = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const search = (searchValue: string) => {
    setLoading(true);
    setErrorMessage(null);

    const fetchData = async () => {
      try {
        const res = await axios.get(`${MOVIE_API_URL}&query=${searchValue}`);
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
        {errorMessage ? (
          <div>{errorMessage}</div>
        ) : !loading && movies.length === 0 ? (
          <span>該当するデータがありませんでした</span>
        ) : (
          movies.map((movie, index) => <Result key={`${index}-${movie.title}`} movie={movie} />)
        )}
      </div>
    </>
  );
};

// https://api.themoviedb.org/3/search/movie?api_key=a8063e5f47a60daac25dbb25e7c45a4b&query=Jack+Reacher
// これで各作品のidが取得できるので、movie?の箇所にidを入れてdetail を見たりとかできるぽい？
// https://api.themoviedb.org/3/movie/343611?api_key=a8063e5f47a60daac25dbb25e7c45a4b

// Netflexの作品検索
// https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
// https://api.themoviedb.org/3/discover/tv?api_key=a8063e5f47a60daac25dbb25e7c45a4b&with_networks=213
