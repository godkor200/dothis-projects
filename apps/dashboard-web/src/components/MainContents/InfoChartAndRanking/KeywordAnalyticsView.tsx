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

  type VideoCount =
    | '0~100'
    | '100~1000'
    | '1000~10000'
    | '10000~50000'
    | '50000~100000'
    | '100000~500000'
    | '500000이상';

  const getTotalVideoCount = useMemo((): [any, number] => {
    let count = 0;

    let sectionObj = {
      100: 0,
      1000: 0,
      10000: 0,
      50000: 0,
      100000: 0,
      500000: 0,
      max: 0,
    };

    const test = new Map<VideoCount, { number: number }>();
    // 해당 키가 이미 존재하면 누적 값을 업데이트하고, 없으면 새로운 항목 추가

    data.forEach((item) => {
      count += item?.videoTotal || 0;
      item?.section.forEach((count) => {
        if (test.has(count.section)) {
          const currentValue = test.get(count.section)!;
          currentValue.number += count.number;
          test.set(count.section, currentValue);
        } else {
          test.set(count.section, { number: count.number });
        }
      });
    });

    return [test, count];
  }, [data]);

  console.log(data);

  return (
    <div className="bg-grey00 ml-5 grow pt-[2.5rem]">
      <AnalysisWidgetList expectedView={lastExpectedView || 0} />
      <div className="flex h-[520px] w-full">
        <ViewChart />
        <div className="flex min-w-[18.12rem] flex-col [&_text]:font-bold">
          <DailyView view={lastDailyView || 0} />
          <CumulativeVideoChart
            totalCount={getTotalVideoCount[1]}
            videoCountsBySection={getTotalVideoCount[0]}
          />
        </div>
      </div>
    </div>
  );
};

export default KeywordAnalyticsView;
