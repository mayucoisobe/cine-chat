import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#fff',
        font: {
          size: 16,
        },
      },
    },
    title: {
      display: true,
      text: '視聴件数',
      color: '#fff',
      font: {
        size: 16,
      },
    },
  },
  scales: {
    //x軸関連
    x: {
      grid: {
        drawBorder: true,
        color: '#fff', //borderの色
      },
      ticks: {
        color: '#fff', //テキストの色
        font: {
          size: 16,
        },
      },
    },
    //y軸関連
    y: {
      grid: {
        drawBorder: true,
        color: '#fff',
      },
      ticks: {
        color: '#fff',
        font: {
          size: 16,
        },
        beginAtZero: true,
      },
    },
  },
};

const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月'];
const data1 = [12, 11, 4, 5, 14, 10, 8];
const data2 = [1, 5, 4, 5, 5, 2, 6];

export const data = {
  labels,
  datasets: [
    {
      label: 'Movie',
      data: data1,
      backgroundColor: 'rgba(255, 206, 86, .2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
    },
    {
      label: 'Tv Shows',
      data: data2,
      backgroundColor: 'rgba(75, 192, 192, .2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
  // datasets: [
  //   {
  //     label: 'Dataset 1',
  //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   },
  //   {
  //     label: 'Dataset 2',
  //     data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //     backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //   },
  // ],
};

// export const ChartVerticalBar = (): JSX.Element => {

// }

export const ChartVerticalBar = (): JSX.Element => {
  return <Bar options={options} data={data} />;
};
