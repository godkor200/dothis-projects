'use client';

import { useMemo } from 'react';

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

  const dailyViewChartData = useMemo(
    () => formatToLineGraph(sumViews(dailyViewData.flat()), '일일 조회 수'),
    [dailyViewData],
  );

  const { data: expectedViewData } = useGetExpectedView();

  const expectedViewChartData = useMemo(
    () =>
      formatToLineGraph(averageViews(expectedViewData.flat()), '기대 조회 수'),
    [expectedViewData],
  );

  return (
    <div className="mr-7 flex h-[460px] w-full flex-col">
      <div className="h-3/6 [&_svg]:overflow-visible">
        <DailyViewChart dailyView={dailyViewChartData} />
      </div>
      <div className="h-3/6 [&_svg]:overflow-visible">
        <ExpectedViewChart expectedView={expectedViewChartData} />
      </div>
    </div>
  );
};

export default ViewChart;
