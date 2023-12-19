import { useMemo } from 'react';

import { useEndDate, useStartDate } from '@/store/dateStore';
import { formatToLineGraph, sumViews } from '@/utils/contents/dailyview';

import useGetDailyView from '../react-query/query/useGetDailyView';

export const useDailyViewChartDataForNivo = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: dailyViewData } = useGetDailyView({ keyword, relword });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () =>
      formatToLineGraph(
        sumViews(dailyViewData.flat(), { startDate, endDate }),
        '일일 조회 수 ',
      ),
    [dailyViewData],
  );
};
