'use client';

import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import { formatToLineGraph, sumViews } from '@/utils/contents/dailyview';

import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  const { data: dailyViewData } = useGetDailyView();

  const dailyViewChartData = formatToLineGraph(sumViews(dailyViewData.flat()));

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
