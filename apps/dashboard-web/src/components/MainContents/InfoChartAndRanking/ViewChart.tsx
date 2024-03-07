'use client';

import './styles.css';

import dayjs from 'dayjs';
import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';

import {
  useDailyViewChartDataForNivo,
  useExpectedViewChartDataForNivo,
} from '@/hooks/contents/useLineGraph';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { getDateObjTime } from '@/utils/contents/dateObject';

const ViewChart = () => {
  const selectedWord = useSelectedWord();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const { isLoading: dailyViewIsLoading } = useGetDailyView(selectedWord);

  const dailyViewChartData = useDailyViewChartDataForNivo(
    selectedWord,
    '일일 조회 수',
  );

  const { isLoading: expectedViewIsLoading } = useGetExpectedView(selectedWord);

  const expectedViewChartData = useExpectedViewChartDataForNivo(
    selectedWord,
    '기대 조회 수',
  );

  // 1. true의 개수 세기
  const trueCount = dailyViewIsLoading.filter(
    (value) => value === false,
  ).length;

  // 2. 전체 배열의 길이로 나누어 비율 계산
  const percentage = (trueCount / dailyViewIsLoading.length) * 100;

  // 3. 퍼센트로 변환
  const formattedPercentage = `${percentage.toFixed(2)}%`;

  // 배열에서 false의 개수를 세는 함수
  const countTrue = (arr: boolean[]) =>
    arr.filter((value) => value === false).length;

  // 배열의 길이로 나누어 퍼센트 계산하는 함수
  const calculatePercentage = (arr: boolean[]) =>
    (countTrue(arr) / arr.length) * 100;

  // 두 배열을 합치기
  const combinedArray = [...dailyViewIsLoading, expectedViewIsLoading];

  // 전체 배열에 대한 퍼센트 계산
  const totalPercentage = useMemo(
    () =>
      calculatePercentage(combinedArray)
        ? `${calculatePercentage(combinedArray)}%`
        : '0%',
    [JSON.stringify(dailyViewChartData), JSON.stringify(expectedViewChartData)],
  );

  const rangeTargetData = [3300, 4900, 4300, 3700, 5500, 5900, 4500];

  const rangeData = [
    [3100, 3400],
    [4200, 5200],
    [3900, 4900],
    [3400, 3900],
    [5100, 5900],
    [5400, 6700],
    [4300, 4600],
  ];

  if (
    combinedArray.length === 0 ||
    combinedArray.some((item) => item === true)
  ) {
    return (
      <div className=" mr-7 flex h-[460px] w-full  flex-col">
        <div className=" flex h-3/6 justify-center [&_svg]:overflow-visible">
          <ReactApexChart
            type="line"
            height={230}
            width={570}
            key={'number'}
            series={[
              {
                name: '일일 조회 수',
                type: 'line',
                color: '#F0516D',
                data: [60000, 56000, 70000, 73000, 70000, 64500, 67000].map(
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
                data: [23, 31, 33, 14, 15, 12, 18].map((item, index) => [
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
                data: [20, 29, 37, 36, 44, 45, 75].map((item, index) => [
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
                zoom: {
                  enabled: false,
                },
                toolbar: { show: false },
                height: '100px',
                width: '200px',

                type: 'line',
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
                strokeDashArray: 4,
                // show:false
                padding: {
                  // right: -10,
                },
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
                // offsetX: 110,
              },

              yaxis: [
                {
                  seriesName: '일일 조회 수',
                  opposite: false,
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,

                    color: '#F0516D',
                  },
                  floating: true,

                  labels: {
                    show: true,

                    formatter(val, opts) {
                      const compactNumber = new Intl.NumberFormat('ko', {
                        notation: 'compact',
                      });
                      return compactNumber.format(val);
                    },
                    style: {
                      colors: '#71717A',
                      fontSize: '12px',
                    },
                  },
                  title: {
                    // text: '일일 조회 수',
                    // style: {
                    //   color: '#71717A',
                    // },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },

                {
                  seriesName: '검색량',
                  opposite: true,
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,
                    color: '#818CF8',
                  },
                  floating: true,
                  labels: {
                    show: true,

                    formatter(val, opts) {
                      return val.toLocaleString('ko-kr');
                    },
                    style: {
                      colors: '#71717A',
                      fontSize: '12px',
                    },
                  },
                  title: {
                    // text: '검색량',
                    style: {
                      color: '#818CF8',
                    },
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
                      colors: '#333',
                      fontSize: '14px',
                      fontWeight: 'bold',
                    },
                  },
                  title: {
                    // text: '검색량',
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
                    show: false,
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
                {
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,

                    color: '#F0516D',
                  },

                  labels: {
                    show: false,

                    style: {
                      colors: '#F0516D',
                    },
                  },
                },
              ],
              xaxis: {
                type: 'datetime',
                min: getDateObjTime(startDate), // 시작 날짜 설정
                // max: getDateObjTime(endDate),
                tooltip: {
                  enabled: false,
                },
                labels: {
                  format: 'MM.dd',
                  // offsetX:
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
                offsetY: 5,
                itemMargin: {
                  horizontal: 10,
                },
                markers: {
                  radius: 4,
                },
                // floating: true,
              },
            }}
          />
        </div>
        <div className="ml-[2px] flex h-3/6 justify-center [&_svg]:overflow-visible">
          <ReactApexChart
            class="range-area-chart"
            options={{
              chart: {
                zoom: {
                  enabled: false,
                },
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
              legend: {
                show: true,
                customLegendItems: ['평균성과'],
                inverseOrder: true,
              },
              title: {
                // text: '평균성과',
              },
              markers: {
                hover: {
                  sizeOffset: 5,
                },
              },

              grid: {
                strokeDashArray: 4,
              },
              xaxis: {
                type: 'datetime',
                min: getDateObjTime(startDate), // 시작 날짜 설정
                // max: getDateObjTime(endDate),

                tickPlacement: 'between',
                tooltip: {
                  enabled: false,
                },
                // floating: true,
                labels: {
                  // formatter(value, timestamp, opts) {
                  //   console.log(value);
                  //   console.log(dayjs(value).format('YYYY-MM-DD'));
                  //   return dayjs(value).format('YYYY-MM-DD');
                  // },

                  style: {
                    cssClass: 'test',
                  },
                  format: 'MM.dd',
                },
              },
              /**
               * https://github.com/apexcharts/apexcharts.js/issues/1053
               * datetime 타입으로 지정시 last label이 보이지않는 버그가 존재
               */
              // xaxis: {
              //   type: 'datetime',
              //   // offsetX: 40,
              // },

              /**
               * https://github.com/apexcharts/apexcharts.js/issues/1053
               * xAxis last label이 보이지않는 이슈로 인해 가상의 yAxis 추가로 주입
               */
              yaxis: [
                {
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,
                    color: '#F0516D',
                  },
                  floating: true,
                  labels: {
                    show: true,
                    formatter(val, opts) {
                      return val.toLocaleString('ko-kr');
                    },
                    style: {
                      colors: '#71717A',
                      fontSize: '12px',
                    },
                  },
                  title: {
                    // text: '일일 조회 수',
                    style: {
                      color: '#F0516D',
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },
                {
                  seriesName: '평균성과 기대치',
                  opposite: false,
                  axisTicks: {
                    show: false,
                  },
                  axisBorder: {
                    show: false,

                    color: '#F0516D',
                  },

                  labels: {
                    show: false,

                    style: {
                      colors: '#F0516D',
                    },
                  },
                  title: {
                    // text: '일일 조회 수',

                    style: {
                      color: '#F0516D',
                    },
                  },
                  tooltip: {
                    enabled: true,
                  },
                },

                {
                  seriesName: '평균성과 기대치',
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
              {
                type: 'rangeArea',
                name: '평균성과 기대치',
                data: rangeData.map((item, index) => ({
                  x: getDateObjTime(
                    dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                  ),
                  y: item,
                })),
              },

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
            type="rangeArea"
            height={230}
            width={570}
          />
        </div>
        <div className="bg-grey200 dark:bg-grey700 mb-4  h-2.5 w-[90%]  translate-x-[60px] rounded-full">
          <div
            className="dark:bg-primary400 bg-primary600 h-2.5 rounded-full"
            style={{ width: totalPercentage }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mr-7 flex h-[460px] w-full flex-col">
      <div className="h-3/6 [&_svg]:overflow-visible">
        {/* <DailyViewChart dailyView={dailyViewChartData} /> */}
      </div>
      <div className="h-3/6 [&_svg]:overflow-visible">
        {/* <ExpectedViewChart expectedView={expectedViewChartData} /> */}
      </div>
    </div>
  );
};

export default ViewChart;
