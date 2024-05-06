import { useMemo } from 'react';

import { useEndDate, useStartDate } from '@/store/dateStore';
import {
  formatToApexChart,
  handleAveragePerformanceData,
  handleDailyVideoCount,
  handleDailyViewData,
  handleNaverSearchRatio,
  handleScopePerformanceData,
} from '@/utils/contents/chart';

import useGetDailyView from '../react-query/query/useGetDailyView';
import useGetNaverSearchRatio from '../react-query/query/useGetNaverSearchRatio';
import useGetPerformanceData from '../react-query/query/useGetPerformanceData';

/**
 *
 */

export const useSearchRatioFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: searchRatioData } = useGetNaverSearchRatio({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const handleSearchRatioDataCallback = formatToApexChart(
    handleNaverSearchRatio,
    {
      name: '검색량',
      type: 'line',
    },
  );

  return useMemo(
    () =>
      handleSearchRatioDataCallback(searchRatioData?.results, {
        startDate,
        endDate,
      }),
    [JSON.stringify(searchRatioData)],
  );
};

/**
 * 서버에서 가져온 일일조회수 데이터를 Apex포맷으로 변경화는 과정을 추상화한 hook입니다.
 * @param selectedWord 선택된 키워드 및 연관어를 받습니다.
 * @returns
 */
export const useDailyViewDataFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: dailyViewData } = useGetDailyView({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const handleDailyViewDataCallback = formatToApexChart(handleDailyViewData, {
    name: '일일조회수',
    type: 'line',
  });

  return useMemo(
    () =>
      handleDailyViewDataCallback(dailyViewData.flat(), { startDate, endDate }),
    [JSON.stringify(dailyViewData)],
  );
};

export const useDailyVideoCountFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: dailyViewData } = useGetDailyView({
    keyword,
    relword,
  });

  console.log(dailyViewData);
  const startDate = useStartDate();
  const endDate = useEndDate();

  const handleDailyViewDataCallback = formatToApexChart(handleDailyVideoCount, {
    name: '영상 수',
    type: 'bar',
  });

  return useMemo(
    () =>
      handleDailyViewDataCallback(dailyViewData.flat(), { startDate, endDate }),
    [JSON.stringify(dailyViewData)],
  );
};

/**
 * 서버에서 가져온 performance데이터를 Apex -> 평균성과 포맷으로 변경화는 과정을 추상화한 hook입니다.
 * @param selectedWord 선택된 키워드 및 연관어를 받습니다.
 * @returns
 */
export const useAveragePerformanceFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: performanceData } = useGetPerformanceData({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const averagePerformanceDataCallback = formatToApexChart(
    handleAveragePerformanceData,
    {
      name: '평균성과',
      type: 'line',
    },
  );

  return useMemo(
    () =>
      averagePerformanceDataCallback(performanceData, {
        startDate,
        endDate,
      }),
    [JSON.stringify(performanceData)],
  );
};

/**
 * 서버에서 가져온 performance데이터를 Apex ->  성과범위 포맷으로 변경화는 과정을 추상화한 hook입니다.
 * @param selectedWord 선택된 키워드 및 연관어를 받습니다.
 * @returns
 */
export const useScopePerformanceFormatter = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: performanceData } = useGetPerformanceData({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const scopePerformanceDataCallback = formatToApexChart(
    handleScopePerformanceData,
    {
      name: '평균성과 기대치',
      type: 'rangeArea',
    },
  );

  return useMemo(
    () =>
      scopePerformanceDataCallback(performanceData, {
        startDate,
        endDate,
      }),
    [JSON.stringify(performanceData)],
  );
};
// export const useExpectedViewChartDataForNivo = (
//   {
//     keyword,
//     relword,
//   }: {
//     keyword: string | null;
//     relword: string | null;
//   },
//   title: string,
// ) => {
//   const { data: expectedViewData } = useGetExpectedView({ keyword, relword });

//   const startDate = useStartDate();
//   const endDate = useEndDate();

//   return useMemo(
//     () =>
//       formatToLineGraph(
//         expectedViews(expectedViewData, { startDate, endDate }),
//         title,
//       ),
//     [JSON.stringify(expectedViewData)],
//   );
// };
