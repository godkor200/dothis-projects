'use client';

import { ResponsiveLine } from '@nivo/line';

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

const DailyViewChart = ({ dailyView }: Props) => {
  const selectedRelWord = useSelectedRelWord();

  const TICK_SIZE = 6;

  const yScales = dailyView[0].data.map((item) => Number(item.y));

  const yMinScale = floorToNearest(
    Math.min(...yScales),
    getRoundingUnit(Math.min(...yScales), 2),
  );

  const yMaxScale = ceilToNearest(
    Math.max(...yScales),
    getRoundingUnit(Math.max(...yScales), 2),
  );

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

  return (
    <ResponsiveLine
      data={dailyView}
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
          }).format(dailyView[0].data[point.index].y)}
          date={dailyView[0].data[point.index].x}
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
