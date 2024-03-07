'use client';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import MainArticleList from '@/components/MainContents/MediaArticles/MainArticleList';
import { CONTENT } from '@/constants/route';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import { useDateActions, useEndDate, useStartDate } from '@/store/dateStore';

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const TestPage = () => {
  const router = useRouter();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const testData = [2000000, 2000000, 2200000, 2000000, 2000000, 2000000, 50];

  const rangeData = [
    [3100, 3400],
    [4200, 5200],
    [3900, 4900],
    [3400, 3900],
    [5100, 5900],
    [5400, 6700],
    [4300, 4600],
  ];

  const testObj = {
    '2024-02-01': 5,
    '2024-02-02': 15,
    '2024-02-03': 80,
    '2024-02-04': 75,
    '2024-02-05': 0,
    '2024-02-06': 150,
    '2024-02-07': 120,
  };

  const rangeTargetData = [3300, 4900, 4300, 3700, 5500, 5900, 4500];

  const { setStartDate, setEndDate } = useDateActions();
  useEffect(() => {}, []);

  const handleDate = () => {
    setStartDate('2023-05-16');
    setEndDate('2023-05-23');
  };
  return (
    <div>
      {/* <MainArticleList /> */}
      <div onClick={handleDate}>버튼</div>
      <ReactApexChart
        options={{
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    color: '#ff5451',
                  },
                  value: {
                    color: '#222',
                  },
                  total: {
                    show: true,
                    color: '#111',
                    showAlways: true,
                    formatter(w) {
                      return '<span style="color: #ff0000;">Label1</span>';
                    },
                  },
                },
              },
            },
          },
          chart: {
            type: 'donut',
          },

          legend: {
            show: false,

            fontSize: '0',
          },
          // responsive: [
          //   {
          //     breakpoint: 480,
          //     options: {
          //       chart: {
          //         width: 200,
          //       },
          //       legend: {
          //         position: 'bottom',
          //       },
          //     },
          //   },
          // ],
        }}
        series={[44, 55, 41, 17, 15]}
        type="donut"
        height={280}
        width={300}
      />
    </div>
  );
};

export default TestPage;

function getDateObjTime(date: string) {
  return new Date(date).getTime();
}
