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

  // const { data } = useGetDailyView({ keyword: '먹방', relword: '불닭' });
  //
  // console.log(data);

  const handleDate = () => {
    setStartDate('2023-05-16');
    setEndDate('2023-05-23');
  };
  return (
    <div>
      <MainArticleList />
      <div onClick={handleDate}>버튼</div>
      <ReactApexChart
        options={{
          chart: {
            type: 'line',
            height: 350,
            stacked: false,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '10px',
              //   endingShape: 'rounded',
            },
          },
          grid: {
            padding: {
              left: 0,
            },
            strokeDashArray: 5,
          },

          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            curve: 'monotoneCubic',
            colors: ['transparent'],
          },
          xaxis: {
            categories: [
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
            ],
            tickPlacement: 'on',
          },
          yaxis: {
            title: {
              text: '$ (thousands)',
            },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return '$ ' + val + ' thousands';
              },
            },
          },
        }}
        series={[
          {
            type: 'bar',
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
          },
          {
            type: 'line',
            name: 'Revenue',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
          },
          //   {
          //     name: 'Free Cash Flow',
          //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
          //   },
        ]}
        type="line"
        height={350}
      />
    </div>
  );
};

export default TestPage;

function getDateObjTime(date: string) {
  return new Date(date).getTime();
}
