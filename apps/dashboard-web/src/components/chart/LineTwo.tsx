'use client';

import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

const LineTwo = () => {
  const data = [
    {
      id: 'test',
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
      id: 'feel',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: '2017-12-29',
          y: 600000,
        },
        {
          x: '2017-12-31',
          y: 770000,
        },
        {
          x: '2018-01-03',
          y: 750000,
        },
        {
          x: '2018-01-05',
          y: 630000,
        },
        {
          x: '2018-01-07',
          y: 790000,
        },
        {
          x: '2018-01-09',
          y: 730000,
        },
        {
          x: '2018-01-11',
          y: 770000,
        },
      ],
    },
  ];

  function unitFormat(value: any) {
    // y scale interval 도출 시 min값을 가져와서 ∙∙∙ 공백 처리 필요

    const compactNumber = new Intl.NumberFormat('ko', {
      notation: 'compact',
    });
    // 일단 임시로 Intl format을 사용(구현 중 디자인상 format이면 Intl로 사용해도 문제없겠다 생각)

    return compactNumber.format(value);
  }

  return (
    <>
      <ChartContainer className="graph-container">
        <ResponsiveLine
          data={data2}
          margin={{ top: 50, right: 600, left: 60 }}
          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
          }}
          yScale={{
            type: 'linear',
            min: 500000,
            max: 1000000,
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          enableGridX={false}
          // x축 눈금 제거
          axisLeft={{
            tickSize: 0,
            tickPadding: 20,
            tickRotation: 0,
            tickValues: [500000, 600000, 700000, 800000, 900000, 1000000],
            format: unitFormat,
            // renderTick: render,
            // rederTick은 format을 더 상세히 자기 입맛에 맞게끔?
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          gridYValues={[500000, 600000, 700000, 800000, 900000, 1000000]}
          lineWidth={13}
          useMesh={true}
          curve="catmullRom"
          // catmullRom 정확한 곡선

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
        />
      </ChartContainer>
      <div
        style={{
          width: '100%',
          height: '450px',
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ right: 600, bottom: 50, left: 60 }}
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
            format: '%b %d',
            legend: 'time scale',
            legendOffset: -12,
            tickValues: 'every 4 days',
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
          lineWidth={13}
          useMesh={true}
          curve="catmullRom"
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
        />
      </div>
    </>
  );
};

export default LineTwo;

const ChartContainer = styled.div`
  width: 100%;
  height: 450px;

  & svg {
    overflow: visible;
  }
`;
// 니보 라이브러리 axisLeft  트랜스폼 위로 조금 Text를  g태그에 담겨있다.??
