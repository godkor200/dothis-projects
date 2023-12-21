import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';
import { useEffect } from 'react';

import CustomTooltip from '@/components/MainContents/InfoChartAndRanking/CustomTooltip';
import { VIEWCHART_LABEL } from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import { NIVO_CHART_COLOR } from '@/constants/nivoChartColor';
import {
  ceilToNearest,
  floorToNearest,
  getRoundingUnit,
  roundToNearest,
  unitFormat,
} from '@/utils/mainContentUtil';

import type { NivoLineChart } from './Container';

interface Props {
  dailyViewChartDataList: NivoLineChart;
}

const RelationDailyViewChart = ({ dailyViewChartDataList }: Props) => {
  const TICK_SIZE = 6;

  const yScales = dailyViewChartDataList.flatMap((data) =>
    data.data.map((item) => Math.abs(Number(item.y))),
  );

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

    return roundToNearest(deviationByTick, getRoundingUnit(deviationByTick, 1));
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

  if (dailyViewChartDataList[0].data.length === 0) {
    return null;
  }
  return (
    <ResponsiveLine
      data={dailyViewChartDataList}
      margin={{ left: 60 }}
      lineWidth={2}
      curve="linear"
      colors={NIVO_CHART_COLOR}
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
      tooltip={({ point }) => {
        return (
          <CustomTooltip
            keyword={point.serieId as string}
            label={VIEWCHART_LABEL.DAILYVIEW}
            value={new Intl.NumberFormat('ko', {
              notation: 'compact',
            }).format(point.data.y as number)}
            date={dayjs(point.data.x).format('YYYY-MM-DD')}
          />
        );
      }}
      //   legends={[
      //     {
      //       anchor: 'bottom',
      //       direction: 'row',
      //       justify: false,
      //       translateX: -120,
      //       translateY: 260,
      //       itemsSpacing: 0,
      //       itemDirection: 'left-to-right',
      //       itemWidth: 130,
      //       itemHeight: 20,
      //       itemOpacity: 0.75,
      //       symbolSize: 12,
      //       symbolShape: 'square',
      //       symbolBorderColor: 'rgba(0, 0, 0, .5)',
      //       effects: [
      //         {
      //           on: 'hover',
      //           style: {
      //             itemBackground: 'rgba(0, 0, 0, .03)',
      //             itemOpacity: 1,
      //           },
      //         },
      //       ],
      //     },
      //   ]}
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

export default RelationDailyViewChart;
