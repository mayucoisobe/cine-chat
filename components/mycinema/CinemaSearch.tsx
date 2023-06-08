import { useState } from 'react';
import { Box, Container } from '@chakra-ui/react';
import axios from 'axios';
import { SearchBar } from './SearchBar';
import { SearchResult } from './SearchResult';

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

export const CinemaSearch = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [type, setType] = useState<string>('');

  const search = (searchValue: string, selectedOption: string) => {
    setLoading(true);
    setErrorMessage(null);

    let apiUrl = '';
    if (selectedOption === 'option1') {
      apiUrl = MOVIE_API_URL;
      setType('movie');
    } else if (selectedOption === 'option2') {
      apiUrl = TV_API_URL;
      setType('tv');
    }

    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}&query=${searchValue}`);
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
      <Box bg="brand.100" color="white">
        <Container minHeight="calc(100vh - 80px)" px={{ base: '4', sm: '6' }}>
          <SearchBar search={search} />
          <div>
            {errorMessage ? (
              <div>{errorMessage}</div>
            ) : !loading && movies.length === 0 ? (
              <span>該当するデータがありませんでした</span>
            ) : (
              movies.map((movie, index) => <SearchResult key={`${index}-${movie.id}`} movie={movie} type={type} />)
            )}
          </div>
        </Container>
      </Box>
    </>
  );
};

// https://api.themoviedb.org/3/search/movie?api_key=a8063e5f47a60daac25dbb25e7c45a4b&query=Jack+Reacher
// これで各作品のidが取得できるので、movie?の箇所にidを入れてdetail を見たりとかできるぽい？
// https://api.themoviedb.org/3/movie/8392?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=ja-JP
// https://api.themoviedb.org/3/tv/87739?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=ja-JP
// type (movie or tv) と id(各作品ごとにあり) をもとに検索をかける
// `https://api.themoviedb.org/3/${type}/${id}?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=ja-JP`

// Netflexの作品検索
// https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213
// https://api.themoviedb.org/3/discover/tv?api_key=a8063e5f47a60daac25dbb25e7c45a4b&with_networks=213

// 画像のない映画の検索
// laland

// カテゴリ（映画/tv）のリスト
// https://api.themoviedb.org/3/genre/movie/list?api_key=a8063e5f47a60daac25dbb25e7c45a4b
// https://api.themoviedb.org/3/genre/tv/list?api_key=a8063e5f47a60daac25dbb25e7c45a4b
