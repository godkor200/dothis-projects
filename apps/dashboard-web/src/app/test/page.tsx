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

  const { data } = useGetDailyView({ keyword: '먹방', relword: '불닭' });

  console.log(data);

  const handleDate = () => {
    setStartDate('2023-05-16');
    setEndDate('2023-05-23');
  };
  return (
    <div>
      <div onClick={handleDate}>버튼</div>
      <div className="">
        <ReactApexChart
          type="line"
          height={230}
          width={624}
          key={'number'}
          series={[
            {
              name: '일일 조회 수',
              data: Object.entries(testObj).map(([date, views]) => [
                getDateObjTime(date),
                views,
              ]),
              // data: testData.map((item, index) => [
              //   getDateObjTime(
              //     dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
              //   ),
              //   item,
              // ]),
            },
            { name: '검색량', data: [30, 26, 34, 10] },
          ]}
          options={{
            grid: {
              strokeDashArray: 4,
              // show:false
            },
            chart: {
              toolbar: { show: false },
              height: 100,
              width: 100,
            },
            stroke: {
              width: 2,
            },

            tooltip: {
              x: {
                format: 'MM월dd일',
              },
            },

            yaxis: [
              {
                seriesName: '일일 조회 수',
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#008FFB',
                },
                forceNiceScale: false,
                labels: {
                  style: {
                    colors: '#008FFB',
                  },
                },
                title: {
                  // text: 'Income (thousand crores)',
                  style: {
                    color: '#008FFB',
                  },
                },
                // tooltip: {
                //   enabled: true,
                // },
              },
              {
                seriesName: '검색량',
                opposite: true,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#00E396',
                },
                labels: {
                  style: {
                    colors: '#00E396',
                  },
                },
              },
              {
                seriesName: '영상 수',
                opposite: true,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#FEB019',
                },
                labels: {
                  style: {
                    colors: '#FEB019',
                  },
                },
                title: {
                  // text: 'Revenue (thousand crores)',
                  style: {
                    color: '#FEB019',
                  },
                },
              },
            ],
            xaxis: {
              type: 'datetime',
              min: getDateObjTime('2024-02-01'), // 시작 날짜 설정
              max: getDateObjTime('2024-02-07'),
              tooltip: {
                enabled: false,
              },
              labels: {
                format: 'MM.dd',
              },
            },
          }}
        />
      </div>
      <div className="">
        <ReactApexChart
          type="line"
          height={280}
          width={630}
          key={'number'}
          series={[
            {
              name: '일일 조회 수',
              type: 'line',
              color: '#F0516D',
              data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6].map(
                (item, index) => [
                  getDateObjTime(
                    dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                  ),
                  item,
                ],
              ),
            },
            {
              name: '검색량',
              type: 'line',
              color: '#818CF8',
              data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5].map((item, index) => [
                getDateObjTime(
                  dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                ),
                item,
              ]),
            },
            {
              name: '영상 수',
              type: 'column',
              color: '#34D399',
              data: [20, 29, 37, 36, 44, 45, 75, 40].map((item, index) => [
                getDateObjTime(
                  dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                ),
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
              type: 'datetime',
              min: getDateObjTime(startDate), // 시작 날짜 설정
              max: getDateObjTime(endDate),
              tooltip: {
                enabled: false,
              },
              labels: {
                format: 'MM.dd',
              },
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
      </div>
      <div>
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
            // colors: ['#d4526e', '#d4526e'],
            // dataLabels: {
            //   enabled: false,
            // },
            // fill: {
            //   opacity: [0.24, 1],
            // },
            // forecastDataPoints: {
            //   count: 2,
            // },
            // stroke: {
            //   curve: 'straight',
            //   width: [1, 2],
            // },
            // legend: {
            //   show: true,
            //   customLegendItems: ['평균성과'],
            //   inverseOrder: true,
            // },
            // title: {
            //   text: '평균성과',
            // },
            // markers: {
            //   hover: {
            //     sizeOffset: 5,
            //   },
            // },

            // grid: {
            //   strokeDashArray: 4,
            // },
            // xaxis: {
            //   type: 'datetime',
            //   min: getDateObjTime(startDate), // 시작 날짜 설정
            //   // max: getDateObjTime(endDate),
            //   tooltip: {
            //     enabled: false,
            //   },
            //   labels: {
            //     // formatter(value, timestamp, opts) {
            //     //   console.log(value);
            //     //   console.log(dayjs(value).format('YYYY-MM-DD'));
            //     //   return dayjs(value).format('YYYY-MM-DD');
            //     // },
            //     format: 'MM.dd',
            //   },
            // },
            /**
             * https://github.com/apexcharts/apexcharts.js/issues/1053
             * datetime 타입으로 지정시 last label이 보이지않는 버그가 존재
             */
            xaxis: {
              type: 'datetime',
              // offsetX: 40,
            },

            /**
             * https://github.com/apexcharts/apexcharts.js/issues/1053
             * xAxis last label이 보이지않는 이슈로 인해 가상의 yAxis 추가로 주입
             */
            yaxis: [
              {
                axisTicks: {
                  show: true,
                },
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
                seriesName: 'Income',
                opposite: true,
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                  color: '#818CF8',
                },
                labels: {
                  show: false,
                  style: {
                    colors: '#818CF8',
                  },
                },
                title: {
                  // text: '검색량',
                  style: {
                    color: '#818CF8',
                  },
                },
              },
            ],
          }}
          series={[
            // {
            //   type: 'rangeArea',
            //   name: '평균성과 기대치',
            //   data: rangeData.map((item, index) => ({
            //     x: getDateObjTime(
            //       dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
            //     ),
            //     y: item,
            //   })),
            // },

            {
              type: 'line',
              name: '평균성과',
              data: rangeTargetData.map((item, index) => ({
                x: getDateObjTime(
                  dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                ),
                y: item,
              })),
            },
          ]}
          type="line"
          height={280}
          width={630}
        />
      </div>
    </div>
  );
};

export default TestPage;

function getDateObjTime(date: string) {
  return new Date(date).getTime();
}
