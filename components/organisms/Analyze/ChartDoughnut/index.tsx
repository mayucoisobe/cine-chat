import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

type Data = {
  labels: string[];
  datasets: { label: string; data: number[]; backgroundColor: string[]; borderColor: string[]; borderWidth: number }[];
};

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '鑑賞傾向',
      color: '#fff',
      font: {
        size: 14,
      },
    },
  },
};

export const data: Data = {
  labels: ['恋愛', 'ヒューマン', 'コメディ', 'ドキュメンタリー', 'ミステリー', 'ホラー'],
  datasets: [
    {
      label: '# of Votes',
      data: [5, 10, 5, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

export const ChartDoughnut = (): JSX.Element => {
  return <Doughnut options={options} data={data} />;
};