'use client';

import { colors } from '@dothis/theme/dashboard/colors';
import { ResponsivePie } from '@nivo/pie';

import type { ResponseType, VideoCount } from '@/constants/convertText';

interface Props {
  totalCount: number;
  videoCountsBySection: ResponseType[VideoCount][];
}

const CumulativeVideoChart = ({ totalCount, videoCountsBySection }: Props) => {
  return (
    <div className="rounded-8 border-grey400 bg-grey00 text-grey600 flex h-[368px] flex-col border p-6 font-bold">
      <div>연간 영상 수</div>
      <div className="relative h-full">
        <div className="absolute left-2/4 top-[82px] flex translate-x-[-50%] flex-col items-center justify-center">
          <div>영상 수</div>
          <div className="text-[20px]">
            <span className="text-primary500">{totalCount}</span>개
          </div>
        </div>
        <ResponsivePie
          data={videoCountsBySection}
          margin={{ top: 26, bottom: 100 }}
          sortByValue={false}
          innerRadius={0.8}
          padAngle={2}
          activeOuterRadiusOffset={8}
          colors={[
            colors.primary600,
            colors.primary400,
            colors.primary300,
            colors.primary200,
            colors.primary100,
          ]}
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
          // legends={[
          //   {
          //     anchor: 'bottom',
          //     direction: 'column',
          //     translateY: 100,
          //     itemsSpacing: 10,
          //     itemWidth: 140,
          //     itemHeight: 18,
          //     itemTextColor: '#71717A',
          //     itemDirection: 'left-to-right',
          //     itemOpacity: 1,
          //     symbolSize: 18,
          //     symbolShape: 'square',
          //     effects: [
          //       {
          //         on: 'hover',
          //         style: {
          //           itemTextColor: '#000',
          //         },
          //       },
          //     ],
          //   },
          // ]}
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
