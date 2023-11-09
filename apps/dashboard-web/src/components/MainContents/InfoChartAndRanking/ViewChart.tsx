'use client';

import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  const { data: dailyViewData } = useGetDailyView();

  const dailyViewChartData = formatToLineGraph(
    sumViews(dailyViewData.flat()),
    '일일 조회 수',
  );

  const { data: expectedViewData } = useGetExpectedView();

  // console.log(
  //   formatToLineGraph(averageViews(expectedViewData.flat()), '기대조회수'),
  // );

  console.log(expectedViewData);

  return (
    <div className="mr-7 flex h-[460px] w-full flex-col">
      <div className="h-3/6 [&_svg]:overflow-visible">
        <DailyViewChart dailyView={dailyViewChartData} />
      </div>
      <div className="h-3/6 [&_svg]:overflow-visible">
        <ExpectedViewChart />
      </div>
    </div>
  );
};

export default ViewChart;
