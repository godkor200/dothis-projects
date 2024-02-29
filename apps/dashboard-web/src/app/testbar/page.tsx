'use client';

import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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

  const { data } = useGetDailyView({ keyword: '서울', relword: '정치' });

  console.log(data);

  const handleDate = () => {
    setStartDate('2023-05-16');
    setEndDate('2023-05-23');
  };
  return (
    <div>
      <ReactApexChart
        type="bar"
        height={280}
        width={630}
        key={'number'}
        series={[
          {
            name: '일일 조회 수',
            type: 'line',
            color: '#F0516D',
            data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8].map((item, index) => [
              index + 1,
              item,
            ]),
          },
          {
            name: '검색량',
            type: 'line',
            color: '#818CF8',
            data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5].map((item, index) => [
              index + 1,
              item,
            ]),
          },
          {
            name: '영상 수',
            type: 'column',
            color: '#34D399',
            data: [20, 29, 37, 36, 44, 45, 75].map((item, index) => [
              index + 1,
              item,
            ]),
          },
        ]}
        // 데이터의 숫자가 정확히 일치해야 tooltipe이 같이뜬다.,
        options={{
          chart: {
            toolbar: { show: false },
            height: 350,
            type: 'line',
            stacked: false,
          },

          plotOptions: {
            bar: {
              columnWidth: '40px',
            },
          },
          grid: {
            strokeDashArray: 4,
            // show:false
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'monotoneCubic',
            width: [4, 4, 1],
          },
          title: {
            // text: 'XYZ - Stock Analysis (2009 - 2016)',
            align: 'left',
            offsetX: 110,
          },

          yaxis: [
            {
              axisTicks: {
                show: true,
              },
              floating: true,
              axisBorder: {
                show: true,
                color: '#F0516D',
              },
              labels: {
                style: {
                  colors: '#F0516D',
                },
              },
              title: {
                text: '일일 조회 수',
                style: {
                  color: '#F0516D',
                },
              },
              tooltip: {
                enabled: true,
              },
            },
            {
              floating: true,
              seriesName: 'Income',
              opposite: true,
              axisTicks: {
                show: true,
              },
              axisBorder: {
                show: true,
                color: '#818CF8',
              },
              labels: {
                style: {
                  colors: '#818CF8',
                },
              },
              title: {
                text: '검색량',
                style: {
                  color: '#818CF8',
                },
              },
            },
            {
              seriesName: 'Revenue',
              opposite: true,
              show: false,

              floating: true,
              axisTicks: {
                // show: true,
              },
              axisBorder: {
                show: true,
                color: '#34D399',
              },
              labels: {
                style: {
                  colors: '#34D399',
                },
              },
              title: {
                text: '영상 수',
                style: {
                  color: '#34D399',
                },
              },
            },
          ],
          xaxis: {
            type: 'category',
            // min: getDateObjTime(startDate), // 시작 날짜 설정
            // max: getDateObjTime(endDate),
            categories: [1, 2, 3, 4, 5, 6, 7],
            tooltip: {
              enabled: false,
            },
            labels: {
              format: 'MM.dd',
            },
            tickPlacement: 'on',
          },

          tooltip: {
            fixed: {
              enabled: true,
              position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60,
            },
          },
          legend: {
            horizontalAlign: 'center',
            offsetX: 40,
          },
        }}
      />

      <ReactApexChart
        options={{
          chart: {
            toolbar: {
              show: false,
            },
            // height: 350,
            type: 'rangeArea',
            // animations: {
            //   speed: 500,
            // },
          },
          colors: ['#d4526e', '#d4526e'],
          dataLabels: {
            enabled: false,
          },
          fill: {
            opacity: [0.24, 1],
          },
          forecastDataPoints: {
            // count: 2,
          },

          stroke: {
            curve: 'straight',
            width: [1, 2],
          },
          // legend: {
          //   show: true,
          //   // customLegendItems: ['평균성과'],
          //   inverseOrder: true,
          // },
          // title: {
          //   // text: '평균성과',
          // },
          markers: {
            hover: {
              sizeOffset: 5,
            },
          },

          grid: {
            strokeDashArray: 4,
          },
          xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            title: {
              text: 'Month',
            },

            tickPlacement: 'between',
          },
          yaxis: {
            title: {
              text: 'Temperature',
            },
            floating: true,
            // min: 5,
            // max: 40,
          },
        }}
        series={[
          {
            type: 'rangeArea',
            name: 'High - 2013',
            data: [
              {
                x: 'Jan',
                y: [3100, 3400],
              },
              {
                x: 'Feb',
                y: [4200, 5200],
              },
              {
                x: 'Mar',
                y: [3900, 4900],
              },
              {
                x: 'Apr',
                y: [3400, 3900],
              },
              {
                x: 'May',
                y: [5100, 5900],
              },
              {
                x: 'Jun',
                y: [5400, 6700],
              },
              {
                x: 'Jul',
                y: [4300, 4600],
              },
            ],
          },
          {
            type: 'line',
            name: 'Low - 2013',
            data: [
              {
                x: 'Jan',
                y: 3300,
              },
              {
                x: 'Feb',
                y: 4900,
              },
              {
                x: 'Mar',
                y: 4300,
              },
              {
                x: 'Apr',
                y: 3700,
              },
              {
                x: 'May',
                y: 5500,
              },
              {
                x: 'Jun',
                y: 5900,
              },
              {
                x: 'Jul',
                y: 4500,
              },
            ],
          },
        ]}
        type="rangeArea"
        height={280}
        width={630}
      />

      {/* <ReactApexChart
        options={{
          annotations: {
            points: [
              {
                x: 'Bananas',
                seriesIndex: 0,
                label: {
                  borderColor: '#775DD0',
                  offsetY: 0,
                  style: {
                    color: '#fff',
                    background: '#775DD0',
                  },
                  text: 'Bananas are good',
                },
              },
            ],
          },
          chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              columnWidth: '50%',
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 2,
          },

          grid: {
            row: {
              colors: ['#fff', '#f2f2f2'],
            },
          },
          xaxis: {
            labels: {
              rotate: -45,
            },
            categories: [
              'Apples',
              'Oranges',
              'Strawberries',
              'Pineapples',
              'Mangoes',
              'Bananas',
              'Blackberries',
              'Pears',
              'Watermelons',
              'Cherries',
              'Pomegranates',
              'Tangerines',
              'Papayas',
            ],
            tickPlacement: 'on',
          },
          yaxis: {
            title: {
              text: 'Servings',
            },
          },
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'light',
              type: 'horizontal',
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 0.85,
              opacityTo: 0.85,
              stops: [50, 0, 100],
            },
          },
        }}
        series={[
          {
            name: 'Servings',
            data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65, 35],
          },
        ]}
        height={350}
        type="bar"
      /> */}
    </div>
  );
};

export default TestPage;

function getDateObjTime(date: string) {
  return new Date(date).getTime();
}
