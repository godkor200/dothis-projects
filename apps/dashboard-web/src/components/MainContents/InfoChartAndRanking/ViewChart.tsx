'use client';

import useDailyViewChartData from '@/hooks/dailyView/useDailyViewChartData ';

import DailyViewChart from './DailyViewChart';
import ExpectedViewChart from './ExpectedViewChart';

const ViewChart = () => {
  const dailyViewChartData = useDailyViewChartData();

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
