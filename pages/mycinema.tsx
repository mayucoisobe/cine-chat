import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Title(): JSX.Element {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        'https://api.themoviedb.org/3/movie/now_playing?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=en-ja&region=US&page=1'
      );
      console.log(res.data);
      setDatas(res.data.results);
    };
    fetchData();
  }, []);

  return (
    <>
      <p>Now Playing</p>
      <ul>
        {datas.map((data, index) => {
          return (
            <li key={data.id}>
              {index}
              <p>{data.original_title}</p>
              <img src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.poster_path}`} />
            </li>
          );
        })}
      </ul>
    </>
  );
}
