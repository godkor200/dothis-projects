'use client';

import { colors } from '@dothis/theme/dashboard/colors';
import { ResponsivePie } from '@nivo/pie';
import ReactApexChart from 'react-apexcharts';

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
        <div className="absolute left-2/4 top-[65px] flex translate-x-[-50%] flex-col items-center justify-center">
          <div>영상 수</div>
          <div className="text-[20px]">
            <span className="text-primary500">{totalCount}</span>개
          </div>
        </div>
        <ReactApexChart
          options={{
            chart: {
              type: 'donut',
            },
            plotOptions: {
              pie: {
                donut: {
                  // donut chart bar 사이즈
                  size: '75',

                  /**
                   * label => 가운데(dont안에) 레이블의 여부
                   * label -> total =>  label을 합계 데이터로 보여질지 여부
                   * total 옵션을 사용하는데 style 커스텀이 어려워서 직접 css로 조정
                   */
                },
              },
            },
            labels: ['1만이상', '2만이상', '3만이상', '4만이상', '5만이상'],
            colors: [
              colors.primary600,
              colors.primary400,
              colors.primary300,
              colors.primary200,
              colors.primary100,
            ],
            // donut chart bar와의 gap 설정 프로퍼티
            stroke: { width: 3 },

            // only hover시에만 legend가 보여지도록
            legend: {
              show: false,
            },

            // donut bar에 data 퍼센테이지 표시여부
            dataLabels: {
              enabled: false,
            },
          }}
          series={[44, 55, 41, 17, 15]}
          type="donut"
          width={'100%'}
        />
        {/* <ResponsivePie
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
        /> */}
      </div>
    </div>
  );
};

export default CumulativeVideoChart;
