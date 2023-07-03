'use client';

import { ResponsiveLine } from '@nivo/line';

const LineChart = () => {
  const data = [
    {
      id: 'test',
      color: 'hsl(81, 70%, 50%)',
      data: [
        {
          x: 10,
          y: 30,
        },
        {
          x: 20,
          y: 40,
        },
        {
          x: 30,
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
          x: 10,
          y: 6000,
        },
        {
          x: 20,
          y: 7700,
        },
        {
          x: 30,
          y: 7500,
        },
        {
          x: 40,
          y: 6300,
        },
        {
          x: 50,
          y: 7900,
        },
        {
          x: 60,
          y: 7300,
        },
        {
          x: 70,
          y: 7700,
        },
      ],
    },
  ];

  function yfloor() {
    let tt = Math.min.apply(
      null,
      data2[0].data.map(({ y }) => y),
    );
    console.log(tt);
    return data2[0].data.map(({ y }) => y);
  }

  yfloor();
  return (
    <>
      <div
        className="graph-container"
        style={{
          height: '50rem',
        }}
      >
        <ResponsiveLine
          data={data2}
          margin={{ top: 50, right: 600, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'symlog',

            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 20,
            tickPadding: 5,
            tickRotation: 0,
            tickValue: [0, 100, 250, 6000, 7000, 8000],
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          gridYValues={4}
          lineWidth={13}
          useMesh={true}
          curve="basis"
          // catmullRom 정확한 곡선

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
      <div
        style={{
          height: '50rem',
        }}
      >
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 600, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          lineWidth={13}
          pointSize={10}
          pointColor="black"
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
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
      <div
        style={{
          height: '50rem',
        }}
      >
        <ResponsiveLine
          animate
          axisBottom={{
            format: '%b %d',
            legend: 'time scale',
            legendOffset: -12,
            tickValues: 'every 4 days',
          }}
          axisLeft={{
            tickValues: [0, 100, 250, 500, 6000, 8000],
            legend: 'symmetric logarithmic scale',
            legendOffset: 12,
          }}
          curve="monotoneX"
          data={[
            {
              data: [
                {
                  x: '2018-01-01',
                  y: 7,
                },
                {
                  x: '2018-01-02',
                  y: 5,
                },
                {
                  x: '2018-01-03',
                  y: 11,
                },
                {
                  x: '2018-01-04',
                  y: 9,
                },
                {
                  x: '2018-01-05',
                  y: 12,
                },
                {
                  x: '2018-01-06',
                  y: 16,
                },
                {
                  x: '2018-01-07',
                  y: 13,
                },
                {
                  x: '2018-01-08',
                  y: 13,
                },
              ],
              id: 'fake corp. A',
            },
            {
              data: [
                {
                  x: '2018-01-04',
                  y: 14,
                },
                {
                  x: '2018-01-05',
                  y: 14,
                },
                {
                  x: '2018-01-06',
                  y: 15,
                },
                {
                  x: '2018-01-07',
                  y: 11,
                },
                {
                  x: '2018-01-08',
                  y: 10,
                },
                {
                  x: '2018-01-09',
                  y: 12,
                },
                {
                  x: '2018-01-10',
                  y: 9,
                },
                {
                  x: '2018-01-11',
                  y: 7,
                },
              ],
              id: 'fake corp. B',
            },
          ]}
          enablePointLabel
          pointBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.3]],
          }}
          pointBorderWidth={1}
          pointSize={16}
          // pointSymbol={function noRefCheck() {}}
          useMesh
          xFormat="time:%Y-%m-%d"
          xScale={{
            format: '%Y-%m-%d',
            precision: 'day',
            type: 'time',
            useUTC: false,
          }}
          yScale={{
            type: 'symlog',
            max: 'auto',
          }}
          margin={{ top: 50, right: 600, bottom: 50, left: 60 }}
        />
        <p className="text">하이</p>
      </div>
      <div
        style={{
          height: '50rem',
        }}
      >
        <ResponsiveLine
          data={[
            {
              id: 'fake corp. A',
              data: [
                {
                  x: 1,
                  y: 22,
                },
                {
                  x: 2,
                  y: 32,
                },
                {
                  x: 3,
                  y: 19,
                },
                {
                  x: 4,
                  y: 28,
                },
                {
                  x: 7,
                  y: 30,
                },
                {
                  x: 9,
                  y: 21,
                },
                {
                  x: 16,
                  y: 31,
                },
              ],
            },
            {
              id: 'fake corp. B',
              data: [
                {
                  x: 1,
                  y: 1220000,
                },
                {
                  x: 2,
                  y: 1180000,
                },
                {
                  x: 3,
                  y: 1150000,
                },
                {
                  x: 4,
                  y: 1200000,
                },
                {
                  x: 7,
                  y: 1250000,
                },
                {
                  x: 9,
                  y: 1190000,
                },
                {
                  x: 16,
                  y: 1390000,
                },
              ],
            },
          ]}
          gridYValues={[0, 10, 20, 30, 40, 1000000, 1200000, 1400000, 1600000]}
          xScale={{
            type: 'log',
            base: 2,
            max: 'auto',
          }}
          axisBottom={{
            legend: 'x',
            legendOffset: -12,
          }}
          yScale={{
            type: 'symlog',
            base: 10,
            max: 'auto',
          }}
          axisLeft={{
            tickValues: [0, 10, 20, 30, 40, 1000000, 1200000, 1400000, 1600000],
            legend: 'y scale',
            legendOffset: 12,
          }}
          curve="basis"
          useMesh={true}
          enableSlices={false}
          margin={{ top: 50, right: 600, bottom: 50, left: 60 }}
        />
      </div>
    </>
  );
};

export default LineChart;
