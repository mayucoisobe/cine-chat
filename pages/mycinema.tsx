import { useState } from 'react';

export default function Title(): JSX.Element {
  const [datas, setDatas] = useState([]);

  fetch(
    'https://api.themoviedb.org/3/movie/now_playing?api_key=a8063e5f47a60daac25dbb25e7c45a4b&language=en-ja&region=US&page=1'
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // 取得したJSONデータの処理
      console.log(data);
      setDatas(data.results);
    })
    .catch((error) => {
      // エラー発生時の処理
      console.log('error');
    });

  // const fetchImage = async () => {
  //   const res = await fetch("https://api.thecatapi.com/v1/images/search");
  //   const images = await res.json();
  //   console.log(images);
  //   return images[0];
  // };

  return (
    <>
      <p>Now Playing</p>
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
