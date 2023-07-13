'use client';

import { ResponsiveLine } from '@nivo/line';

import * as Style from './style';
import {
  ceilToNearest,
  floorToNearest,
  getRoundingUnit,
  roundToNearest,
  unitFormat,
} from './utils';

const LineTwo = () => {
  const data = [
    {
      id: '기대 조회 수(단위:배)',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: '2017-12-29',
          y: 30,
        },
        {
          x: '2017-12-31',
          y: 40,
        },
        {
          x: '2018-01-02',
          y: 70,
        },
        {
          x: '2018-01-04',
          y: 90,
        },
        {
          x: '2018-01-06',
          y: 70,
        },
        {
          x: '2018-01-08',
          y: 100,
        },
        {
          x: '2018-01-10',
          y: 70,
        },
      ],
    },
  ];
  const data2 = [
    {
      id: '일일 조회 수(단위:회)',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: '2017-12-29',
          y: 75_0000,
        },
        {
          x: '2017-12-31',
          y: 114_0000,
        },
        {
          x: '2018-01-03',
          y: 109_0000,
        },
        {
          x: '2018-01-05',
          y: 98_0000,
        },
        {
          x: '2018-01-07',
          y: 89_0000,
        },
        {
          x: '2018-01-09',
          y: 110_0000,
        },
        {
          x: '2018-01-11',
          y: 271_0000,
        },
      ],
    },
  ];

  // 현재 공통된 style 프로퍼티는 공용을 만들어서 관리할 생각

  // 서버 데이터랑 포맷팅이 필요
  // y data 도출하기

  const tickSize = 6;
  const yArr = data2[0].data.map((item) => item.y);

  const yArrMin = floorToNearest(
    Math.min(...yArr),
    getRoundingUnit(Math.min(...yArr), 2),
  );

  const yArrMax = ceilToNearest(
    Math.max(...yArr),
    getRoundingUnit(Math.max(...yArr), 2),
  );

  function getAxisInterval() {
    const deviationByTick = (yArrMax - yArrMin) / (tickSize - 2);

    return ceilToNearest(deviationByTick, getRoundingUnit(deviationByTick, 1));
  }

  // interval이 yArrmin보다 클 경우 예외처리가 너무 골치아픔

  function getStartValue() {
    const yStartValue = yArrMin - getAxisInterval();

    // return yStartValue > yArrMin ? 0 : yStartValue;
    return yStartValue;
  }

  // 현재 startValue가 yArrmin이 interval보다 작을경우 음수값이 대입이 된다..  이경우 예외처리가 필요하다

  const getYAxisRange = Array.from(
    { length: tickSize },
    (_, i) =>
      floorToNearest(getStartValue(), getRoundingUnit(getStartValue(), 1)) +
      i * getAxisInterval(),
  );

  // interval을  값을 미리 구해놔야함 그러고 Ymin에 적용
  // 딱 interval 값을 정해놔야한다,  반응적인 interval은 적용되면 안댐 절떄

  return (
    <>
      <Style.ChartContainer>
        <ResponsiveLine
          data={data2}
          margin={{ top: 50, right: 600, left: 60 }}
          lineWidth={4}
          colors={{ scheme: 'red_yellow_blue' }}
          curve="catmullRom"
          // catmullRom 정확한 곡선

          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
          }}
          yScale={{
            type: 'linear',
            // yAxis 범위가 값으로만 정해져서 linear (커스텀이 가능한데, 못 찾은걸수도 있습니다)
            min: Math.min(...getYAxisRange),
            max: Math.max(...getYAxisRange),
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,
            tickValues: getYAxisRange,
            // yAxis value
            format: (value: number) =>
              unitFormat(value, Math.min(...getYAxisRange)),
            // renderTick: render,
            // rederTick은 format을 더 상세히 자기 입맛에 맞게끔?
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          enableGridX={false}
          // x축 눈금 제거
          gridYValues={getYAxisRange}
          // y 축 눈금
          useMesh={true}
          // 마우스 상호작용을 감지하며 tooltip생성

          enablePoints={false}
          // point 활성화, 비활성화
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 380,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: 'green',
                },
                text: {
                  fill: 'black',
                  fontSize: 16,
                },
              },
            },
            grid: {
              line: {
                stroke: 'pink',
                strokeWidth: 2,
                strokeDasharray: '4 4',
              },
            },
          }}
        />
      </Style.ChartContainer>
      <div
        style={{
          width: '100%',
          height: '450px',
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ right: 600, bottom: 50, left: 60 }}
          lineWidth={4}
          colors={{ scheme: 'category10' }}
          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
          }}
          enableGridX={false}
          yScale={{
            type: 'linear',
            min: 0,
            max: 120,
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%m.%d',
            legendOffset: -12,
            tickValues: 'every 2 days',
          }}
          axisLeft={{
            tickValues: [20, 40, 60, 80, 100],
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,

            legendOffset: -40,
            legendPosition: 'middle',
          }}
          gridYValues={[0, 20, 40, 60, 80, 100, 120]}
          useMesh={true}
          curve="catmullRom"
          enablePoints={false}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
          theme={{
            axis: {
              ticks: {
                line: {
                  stroke: 'green',
                },
                text: {
                  fill: 'black',
                  fontSize: 16,
                },
              },
            },
            grid: {
              line: {
                stroke: 'pink',
                strokeWidth: 2,
                strokeDasharray: '4 4',
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default LineTwo;

// 니보 라이브러리 axisLeft  트랜스폼 위로 조금 Text를  g태그에 담겨있다.??
