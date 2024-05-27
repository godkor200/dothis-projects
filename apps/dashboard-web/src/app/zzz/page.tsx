'use client';

import dayjs from 'dayjs';

// import DashboardAreaChart from '@/components/common/Charts/DashboardAreaChart';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { getDateObjTime } from '@/utils/contents/dateObject';

const Page = () => {
  const startDate = useStartDate();

  // 1. true의 개수 세기

  const rangeTargetData = [[0.59], [1.4], [2], [3], [0], [0]];

  const rangeData = [
    [0.55, 0.61],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ];

  return (
    <div>
      <div className="ml-[2px] flex h-3/6 justify-center [&_svg]:overflow-visible">
        {/* <DashboardAreaChart
          series={[
            {
              type: 'rangeArea',
              name: '평균성과 기대치',
              data: rangeData.map((item, index) => ({
                x: getDateObjTime(
                  dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                ),
                y: item,
              })),
            },

            {
              type: 'line',
              name: '평균성과',
              data: rangeTargetData.map((item, index) => ({
                x: getDateObjTime(
                  dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                ),
                y: item,
              })),
            },
          ]}
        /> */}

        {/* <DashboardLineChart
          series={[
            {
              name: '일일 조회 수',
              type: 'line',
              color: '#F0516D',
              data: [0.15, 0.45, 0.11, 0.22, 0.43, 0.02].map((item, index) => [
                getDateObjTime(
                  dayjs(startDate).add(index, 'day').format('YYYY-MM-DD'),
                ),
                item,
              ]),
            },
          ]}
        /> */}
      </div>
    </div>
  );
};

export default Page;
