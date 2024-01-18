import { ResponsiveLine } from '@nivo/line';
import dayjs from 'dayjs';

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
  expectedViewChartDataList: NivoLineChart;
}

const legendProps = {
  anchor: 'bottom',
  translateY: 50,
  direction: 'row',
  itemWidth: 100,
  itemHeight: 26,
  itemsSpacing: 60,
  itemOpacity: 0.8,
  symbolShape: 'square',
};

const RelationExpectedViewChart = ({ expectedViewChartDataList }: Props) => {
  const TICK_SIZE = 6;

  const yScales = expectedViewChartDataList.flatMap((data) =>
    data.data.map((item) => Number(item.y)),
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

  if (expectedViewChartDataList[0]?.data.length === 0) {
    return null;
  }
  return (
    <ResponsiveLine
      data={expectedViewChartDataList}
      margin={{ left: 60, top: 40 }}
      lineWidth={2}
      colors={NIVO_CHART_COLOR}
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
          keyword={point.serieId as string}
          label={VIEWCHART_LABEL.EXPECTEDVIEW}
          value={new Intl.NumberFormat('ko', {
            notation: 'compact',
          }).format(point.data.y as number)}
          date={dayjs(point.data.x).format('YYYY-MM-DD')}
        />
      )}
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

      //   legends={[
      //     {
      //       anchor: 'bottom',
      //       direction: 'row',
      //       justify: false,
      //       translateY: 80,
      //       itemsSpacing: 0,
      //       itemDirection: 'left-to-right',
      //       itemWidth: 80,
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
      legends={
        expectedViewChartDataList && expectedViewChartDataList.length <= 6
          ? [
              {
                ...legendProps,
                translateY: 50,
                symbolSize: 18,
                itemsSpacing: 60,
              },
            ]
          : [
              {
                ...legendProps,
                symbolSize: 10,
                itemsSpacing: 25,
                translateY: 50,
                data: expectedViewChartDataList
                  .slice(0, Math.floor(expectedViewChartDataList.length / 2))
                  .map((cur, index) => ({
                    id: cur.id,
                    label: cur.id,
                    color: NIVO_CHART_COLOR.slice(
                      0,
                      Math.floor(expectedViewChartDataList.length / 2),
                    )[index],
                  })),
              },
              {
                ...legendProps,
                symbolSize: 10,
                itemsSpacing: 25,
                translateY: 70,
                data: expectedViewChartDataList
                  .slice(Math.floor(expectedViewChartDataList.length / 2))
                  .map((cur, index) => ({
                    id: cur.id,
                    label: cur.id,
                    color: NIVO_CHART_COLOR.slice(
                      Math.floor(expectedViewChartDataList.length / 2),
                    )[index],
                  })),
              },
            ]
      }
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

export default RelationExpectedViewChart;

const nivoColorSet2Order = [
  '#7ECBB3',
  '#FC8D62',
  '#8D9FCA',
  '#E789C3',
  '#A5D853',
  '#FFDF58',
  '#E5C494',
  '#B8B8B8',
];

type Custom = {
  keys: string[];
};
const CustomLegend = ({ keys }: Custom) => {
  let colorCount = -1;
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '30px',
        marginLeft: '50px',
        marginRight: '50px',
        overflowX: 'auto',
        overflowY: 'hidden',
        lineBreak: 'auto',
      }}
    >
      {keys.map((chartKey, index) => {
        colorCount++;
        if (colorCount === 8) {
          colorCount = 0;
        }
        return (
          <div
            key={index}
            style={{
              paddingBottom: '5px',
              flexShrink: 0,
              fontFamily: 'sans-serif',
              fontSize: '12px',
              fill: 'rgb(51, 51, 51)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .05)',
                cursor: 'pointer',
              },
            }}
          >
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '2px',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  backgroundColor: nivoColorSet2Order[colorCount],
                }}
              ></div>
              <span>{chartKey}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
