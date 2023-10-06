'use client';

import { ResponsivePie } from '@nivo/pie';

const data = [
  {
    id: '구독자 수 비슷한 채널',
    label: '구독자 수 비슷한 채널',
    value: 421,
  },
  {
    id: '구독자 10만 이상 채널',
    label: '구독자 10만 이상 채널',
    value: 166,
  },
  {
    id: '그 외',
    label: '그 외',
    value: 149,
  },
];

const CumulativeVideoChart = () => {
  return (
    <div className="flex h-[368px] flex-col rounded-8 border border-grey400 bg-grey00 p-6 font-bold text-grey600">
      <div>누적 영상 수</div>
      <div className="relative h-full">
        <div className="absolute left-2/4 top-[82px] flex translate-x-[-50%] flex-col items-center justify-center">
          <div>전체 영상</div>
          <div className="text-[20px]">
            <span className="text-primary500">1만 6,420</span>개
          </div>
        </div>
        <ResponsivePie
          data={data}
          margin={{ top: 26, bottom: 100 }}
          sortByValue={true}
          innerRadius={0.8}
          activeOuterRadiusOffset={8}
          colors={['#f07288', '#f7b4c0', '#fde7eb']}
          borderColor={{
            from: 'color',
            modifiers: [['darker', '0.2']],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          enableArcLabels={false}
          arcLabelsRadiusOffset={0.45}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'column',
              translateY: 100,
              itemsSpacing: 10,
              itemWidth: 140,
              itemHeight: 18,
              itemTextColor: '#71717A',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'square',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
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
          }}
        />
      </div>
    </div>
  );
};

export default CumulativeVideoChart;
