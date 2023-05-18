import { useEffect, useState } from 'react';
import axios from 'axios';

type Movie = {
  id: number;
  name: string;
  original_title: string;
  original_name: string;
  poster_path: string;
  // backdrop_path: string;
};

const MOVIE_API_URL =
  'https://api.themoviedb.org/3/movie/now_playing?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=en-ja&region=US&page=1';

export default function mycinema(): JSX.Element {
  const [datas, setDatas] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        MOVIE_API_URL
        // 'https://api.themoviedb.org/3/movie/now_playing?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=en-ja&region=US&page=1'
      );
      console.log(res.data.results);
      setDatas(res.data.results);
      return res;
    };
    fetchData();
  }, []);

  return (
    <>
      <p>表示のテスト</p>
      <ul>
        {datas.map((data, index) => {
          return (
            <li key={data.id}>
              {index}
              <p>{data.original_title}</p>
              <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
