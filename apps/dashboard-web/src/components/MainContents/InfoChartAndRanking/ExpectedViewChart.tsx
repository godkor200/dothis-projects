'use client';

import { ResponsiveLine } from '@nivo/line';
import { useCallback, useMemo } from 'react';

import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import {
  ceilToNearest,
  floorToNearest,
  getRoundingUnit,
  roundToNearest,
  unitFormat,
} from '@/utils/mainContentUtil';

import CustomTooltip from './CustomTooltip';
import { VIEWCHART_LABEL } from './KeywordAnalyticsView';

interface Props {
  expectedView: { id: string; data: { x: string; y: number }[] }[];
}

function getRandomValue() {
  // 랜덤한 값 생성 (10만에서 100만)
  return Math.floor(Math.random() * (80 - 0 + 1)) + 0;
}

const ExpectedViewChart = ({ expectedView }: Props) => {
  const selectedRelWord = useSelectedRelWord();
  // const testExpectedView = useMemo(
  //   () => [
  //     {
  //       id: '기대',
  //       data: [
  //         { x: '2023-11-16', y: getRandomValue() },
  //         { x: '2023-11-17', y: getRandomValue() },
  //         { x: '2023-11-18', y: getRandomValue() },
  //         { x: '2023-11-19', y: getRandomValue() },
  //         { x: '2023-11-20', y: getRandomValue() },
  //         { x: '2023-11-21', y: getRandomValue() },
  //         { x: '2023-11-22', y: getRandomValue() },
  //       ],
  //     },
  //   ],
  //   [selectedRelWord],
  // );

  const TICK_SIZE = 6;
  const yScales = expectedView[0].data.map((item) => Number(item.y));

  const yMinScale = floorToNearest(
    Math.min(...yScales),
    getRoundingUnit(Math.min(...yScales), 2),
  );

  const yMaxScale = ceilToNearest(
    Math.max(...yScales),
    getRoundingUnit(Math.max(...yScales), 2),
  );

  /**
   * yMaxScale와 yMinScale에 따라 y축의 간격(yInterval)을 구하는 함수
   * deviationByTick가 음수or 소수로 잡히는 경우도 존재해서 그런경우 1로 고정
   * @returns
   */
  const getAxisInterval = () => {
    // tick이 1보다 작을경우 올림이 안되서 소수점으로 보기안좋게 보여짐 그래서 1로 설정
    const deviationByTick =
      (yMaxScale - yMinScale) / (TICK_SIZE - 2) < 1
        ? 1
        : (yMaxScale - yMinScale) / (TICK_SIZE - 2);

    return ceilToNearest(deviationByTick, getRoundingUnit(deviationByTick, 1));
  };

  const getStartValue = () => {
    return yMinScale - getAxisInterval() < 1
      ? 0
      : yMinScale - getAxisInterval();
  };

  const yAxisRange = () =>
    Array.from(
      { length: TICK_SIZE },
      (_, index) =>
        roundToNearest(getStartValue(), getRoundingUnit(getStartValue(), 2)) +
        index * Math.ceil(getAxisInterval()),
    );

  // every 함수를 넣어준 이유 -> 한개의 data만 들어왔을 때  yAxisRange가 5개 공통 값으로 형성이됩니다. 이렇게 형성이 되었을 경우 nivo 그래프가 렌더링 이슈로 인해 그래프 점선이 남아있음

  if (expectedView[0].data.length === 0) {
    return (
      <div className="relative ">
        <ExpectedViewSkeleton />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          {/* g태그 만큼 translate를 줬지만 정확치않다. */}
          <p className="translate-x-[30px] translate-y-[-25px] transform">
            데이터가 충분하지 않습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveLine
      data={expectedView}
      margin={{ bottom: 50, left: 60, top: 30 }}
      lineWidth={2}
      colors={['#818CF8']}
      curve="linear"
      xScale={{
        format: '%Y-%m-%d',
        precision: 'day',
        type: 'time',
        useUTC: false,
      }}
      yScale={{
        type: 'linear',
        min: Math.min(...yAxisRange()),
        max: Math.max(...yAxisRange()),
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      enableGridX={false}
      enablePoints={false}
      gridYValues={yAxisRange()}
      // 배열로 값넣으면 그것 수치만큼 적용되고, number값으로 넣으면 그거에 맞는 line 갯수를 생성
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%m.%d',
        legendOffset: -12,
        tickValues: 7,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        tickValues: yAxisRange(),
        legendOffset: -40,
        legendPosition: 'middle',
        format: (value: number) => unitFormat(value, Math.max(...yAxisRange())),
      }}
      useMesh={true}
      tooltip={({ point }) => (
        <CustomTooltip
          keyword={selectedRelWord!}
          label={VIEWCHART_LABEL.EXPECTEDVIEW}
          value={expectedView[0].data[point.index].y}
          date={expectedView[0].data[point.index].x}
        />
      )}
      legends={[
        {
          anchor: 'bottom',
          direction: 'column',
          justify: false,
          translateX: 60,
          translateY: 80,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'square',
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
        fontFamily: 'Pretendard',
        legends: {
          text: { fontSize: 12, fontWeight: 500 },
        },
        axis: {
          ticks: {
            text: {
              fill: '#71717A',
              fontSize: 12,
              fontWeight: 500,
            },
          },
        },
        grid: {
          line: {
            stroke: '#D4D4D8',
            strokeWidth: 1,
            strokeDasharray: '4 4',
          },
        },
      }}
    />
  );
};

const ExpectedViewSkeleton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="230"
      role="img"
    >
      <rect width="100%" height="230" fill="transparent"></rect>
      <g transform="translate(60,30)">
        <g>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="150"
            y2="150"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="120"
            y2="120"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="90"
            y2="90"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="60"
            y2="60"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="30"
            y2="30"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="0"
            y2="0"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
        </g>
      </g>
    </svg>
  );
};

ExpectedViewChart.skeleton = ExpectedViewSkeleton;

export default ExpectedViewChart;
