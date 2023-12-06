'use client';

import { ResponsiveLine } from '@nivo/line';
import { useMemo } from 'react';

import { useSelectedRelWord } from '@/store/selectedRelWordStore';

import {
  ceilToNearest,
  floorToNearest,
  getRoundingUnit,
  roundToNearest,
  unitFormat,
} from '../../../utils/mainContentUtil';
import CustomTooltip from './CustomTooltip';
import { VIEWCHART_LABEL } from './KeywordAnalyticsView';

interface Props {
  dailyView: { id: string; data: { x: string; y: number }[] }[];
}

function getRandomValue() {
  // 랜덤한 값 생성 (10만에서 100만)
  return Math.floor(Math.random() * (900000 - 200000 + 1)) + 200000;
}

const DailyViewChart = ({ dailyView }: Props) => {
  const selectedRelWord = useSelectedRelWord();

  const testDailyView = useMemo(
    () => [
      {
        id: '기대',
        data: [
          { x: '2023-11-16', y: getRandomValue() },
          { x: '2023-11-17', y: getRandomValue() },
          { x: '2023-11-18', y: getRandomValue() },
          { x: '2023-11-19', y: getRandomValue() },
          { x: '2023-11-20', y: getRandomValue() },
          { x: '2023-11-21', y: getRandomValue() },
          { x: '2023-11-22', y: getRandomValue() },
        ],
      },
    ],
    [selectedRelWord],
  );

  const TICK_SIZE = 6;

  const yScales = testDailyView[0].data.map((item) => Number(item.y));

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
    const deviationByTick =
      (yMaxScale - yMinScale) / (TICK_SIZE - 2) < 1
        ? 1
        : (yMaxScale - yMinScale) / (TICK_SIZE - 2);

    return ceilToNearest(deviationByTick, getRoundingUnit(deviationByTick, 1));
    // 여기는 floor여야겠다 너무 편차가 크다. 기존(ceil)
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

  if (dailyView[0].data.length === 0) {
    return (
      <div className="relative ">
        <DailyViewSkeleton />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          {/* g태그 만큼 translate를 줬지만 정확치않다. */}
          <p className="translate-x-[30px] translate-y-[25px] transform">
            데이터가 충분하지 않습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResponsiveLine
      data={testDailyView}
      margin={{ top: 50, left: 60 }}
      lineWidth={2}
      colors={['#F0516D']}
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
      yFormat=">-.2f"
      enableGridX={false}
      enablePoints={false}
      gridYValues={yAxisRange()}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        tickValues: yAxisRange(),
        legendOffset: -40,
        legendPosition: 'middle',
        format: (value: number) => unitFormat(value, Math.min(...yAxisRange())),
      }}
      useMesh={true}
      tooltip={({ point }) => (
        <CustomTooltip
          keyword={selectedRelWord!}
          label={VIEWCHART_LABEL.DAILYVIEW}
          value={new Intl.NumberFormat('ko', {
            notation: 'compact',
          }).format(testDailyView[0].data[point.index].y)}
          date={testDailyView[0].data[point.index].x}
        />
      )}
      legends={[
        {
          anchor: 'bottom',
          direction: 'row',
          justify: false,
          translateX: -120,
          translateY: 260,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 130,
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

const DailyViewSkeleton = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="230"
      role="img"
    >
      <rect width="100%" height="230" fill="transparent"></rect>
      <g transform="translate(60,50)">
        <g>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="180"
            y2="180"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="144"
            y2="144"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="108"
            y2="108"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="72"
            y2="72"
            stroke="#D4D4D8"
            strokeWidth="1"
            strokeDasharray="4 4"
          ></line>
          <line
            opacity="1"
            x1="0"
            x2="90%"
            y1="36"
            y2="36"
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
        <g>
          <rect
            width="576.34375"
            height="179.984375"
            fill="red"
            opacity="0"
          ></rect>
        </g>
      </g>
    </svg>
  );
};

DailyViewChart.skeleton = DailyViewSkeleton;

export default DailyViewChart;
