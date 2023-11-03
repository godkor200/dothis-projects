'use client';

import { ResponsiveRadar } from '@nivo/radar';

import SvgComp from '@/components/common/SvgComp';
import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import {
  DUMMY_VIEW_DATA,
  MONTHLY_VIEW_DUMMY_DATA,
} from '@/mocks/monthlyReport/monthlyViewDummyData';
import useGetRelWords from '@/query/user/useGetRelWords';

import SummaryItem from '../AnalysisWidgetItem';

const MonthlyViewData = () => {
  const { data, isLoading } = useGetDailyView();

  // const categoryViewData = data?.map((item) => {
  //   return item?.reduce((acc: Record<string, string | number>, cur) => {
  //     acc.clusterNumber = cur.clusterNumber;
  //     acc.views = ((acc.views as number) || 0) + cur.increase_views;

  //     return acc;
  //   }, {});
  // });

  return (
    <>
      <h3 className="typo-t2 mt-10  flex items-center gap-[4px]">
        월간 View
        <SvgComp icon="Question" size={18} />
      </h3>
      <ul className="mt-5 flex gap-[20px]">
        {MONTHLY_VIEW_DUMMY_DATA.map(({ title, content }) => (
          <SummaryItem key={title} title={title} content={content} />
        ))}
      </ul>
      <div className="h-[500px] w-[500px]">
        {/* {!isLoading && ( */}
        <ResponsiveRadar
          data={DUMMY_VIEW_DATA}
          keys={['views']}
          indexBy="clusterNumber"
          valueFormat=">-.2f"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          borderColor={{ from: 'color' }}
          gridLabelOffset={36}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          colors={{ scheme: 'nivo' }}
          blendMode="multiply"
          motionConfig="wobbly"
          legends={[
            {
              anchor: 'top-left',
              direction: 'column',
              translateX: -50,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999',
              symbolSize: 12,
              symbolShape: 'circle',
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
        />
        {/* )} */}
      </div>
    </>
  );
};

export default MonthlyViewData;
