'use client';

import { ResponsiveLine } from '@nivo/line';

import { useSelectedRelWord } from '@/store/selectedRelWordStore';

import { VIEWCHART_LABEL } from './KeywordAnalyticsView';
import CustomTooltip from './CustomTooltip';
import {
  ceilToNearest,
  floorToNearest,
  getRoundingUnit,
  unitFormat,
} from '../../../utils/mainContentUtil';

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
    const deviationByTick = (yMaxScale - yMinScale) / (TICK_SIZE - 2);

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
        floorToNearest(getStartValue(), getRoundingUnit(getStartValue(), 1)) +
        index * getAxisInterval(),
    );

  if (dailyView[0].data.length === 0) {
    return;
  }

  console.log(yAxisRange());
  console.log(dailyView);
  return (
    <ResponsiveLine
      data={dailyView}
      margin={{ top: 50, left: 60 }}
      lineWidth={2}
      colors={['#F0516D']}
      curve="catmullRom"
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
        stacked: true,
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

export default DailyViewChart;
