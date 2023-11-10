'use client';

import { ResponsiveLine } from '@nivo/line';

import { useSelectedRelWord } from '@/store/selectedRelWordStore';

import CustomTooltip from './CustomTooltip';
import { VIEWCHART_LABEL } from './KeywordAnalyticsView';

interface Props {
  expectedView: { id: string; data: { x: string; y: number }[] }[];
}

const ExpectedViewChart = ({ expectedView }: Props) => {
  console.log(expectedView);
  const selectedRelWord = useSelectedRelWord();
  return (
    <ResponsiveLine
      data={expectedView}
      margin={{ bottom: 50, left: 60 }}
      lineWidth={2}
      colors={['#818CF8']}
      curve="catmullRom"
      xScale={{
        format: '%Y-%m-%d',
        precision: 'day',
        type: 'time',
        useUTC: false,
      }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 120,
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      enableGridX={false}
      enablePoints={false}
      gridYValues={[0, 20, 40, 60, 80, 100, 120]}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: '%m.%d',
        legendOffset: -12,
        tickValues: 'every 1 days',
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
        tickValues: [20, 40, 60, 80, 100],
        legendOffset: -40,
        legendPosition: 'middle',
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

export default ExpectedViewChart;
