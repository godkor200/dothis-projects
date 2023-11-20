'use client';

import { useMemo } from 'react';

import useGetDailyView from '@/hooks/react-query/query/useGetDailyView';
import useGetExpectedView from '@/hooks/react-query/query/useGetExpectedView';
import useGetVideoCount from '@/hooks/react-query/query/useGetVideoCount';
import {
  averageViews,
  formatToLineGraph,
  sumViews,
} from '@/utils/contents/dailyview';

import AnalysisWidgetList from './AnalysisWidgetList';
import CumulativeVideoChart from './CumulativeVideoChart';
import DailyView from './DailyView';
import ViewChart from './ViewChart';

export const VIEWCHART_LABEL = {
  DAILYVIEW: '일일 조회수',
  EXPECTEDVIEW: '기대 조회수',
} as const;

const KeywordAnalyticsView = () => {
  const { data: dailyViewData } = useGetDailyView();

  const dailyViewChartData = useMemo(
    () => formatToLineGraph(sumViews(dailyViewData.flat()), '일일 조회 수'),
    [dailyViewData],
  );

  const lastDailyView = dailyViewChartData[0].data.at(-1)?.y;

  const { data: expectedViewData } = useGetExpectedView();

  const expectedViewChartData = useMemo(
    () =>
      formatToLineGraph(averageViews(expectedViewData.flat()), '기대 조회 수'),
    [expectedViewData],
  );

  const lastExpectedView = expectedViewChartData[0].data.at(-1)?.y;

  const { data } = useGetVideoCount();

  return (
    <div className="bg-grey00 ml-5 grow pt-[2.5rem]">
      <AnalysisWidgetList expectedView={lastExpectedView || 0} />
      <div className="flex h-[520px] w-full">
        <ViewChart />
        <div className="flex min-w-[18.12rem] flex-col [&_text]:font-bold">
          <DailyView view={lastDailyView || 0} />
          <CumulativeVideoChart />
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalyticsView;
