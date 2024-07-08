import { useMemo } from 'react';

import { useEndDate, useStartDate } from '@/store/dateStore';
import {
  formatToApexChart,
  handleAveragePerformanceData,
  handleDailyVideoCount,
  handleDailyVideoCountD3,
  handleDailyViewData,
  handleDailyViewDataD3,
  handleExpectedViewAreaD3,
  handleExpectedViewD3,
  handleNaverSearchRatio,
  handleNaverSearchRatioD3,
  handleScopePerformanceData,
  handleVideoUploadCountD3,
} from '@/utils/contents/chart';

import useGetDailyExpectedView from '../react-query/query/useGetDailyExpectedView';
import useGetDailyView from '../react-query/query/useGetDailyView';
import useGetDailyViewV2 from '../react-query/query/useGetDailyViewV2';
import useGetNaverSearchRatio from '../react-query/query/useGetNaverSearchRatio';
import useGetPerformanceData from '../react-query/query/useGetPerformanceData';
import useGetVideoUploadCount from '../react-query/query/useGetVideoUploadCount';

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

export const useSearchRatioFormatterD3 = ({
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

  return useMemo(
    () =>
      handleNaverSearchRatioD3(searchRatioData?.results, {
        startDate,
        endDate,
      }),
    [JSON.stringify(searchRatioData)],
  );
};

export const useUploadVideoCountFormatterD3 = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const { data: videoUploadCount } = useGetVideoUploadCount({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () =>
      handleVideoUploadCountD3(videoUploadCount, {
        startDate,
        endDate,
      }),
    [JSON.stringify(videoUploadCount)],
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

export const useExpectedViewFormatter = ({
  keyword,
  relword,
}: {
  keyword: string;
  relword: string | null;
}) => {
  const { data: expectedViewData } = useGetDailyExpectedView({
    baseKeyword: keyword,
    relatedKeyword: relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return {
    expectedView: useMemo(
      () =>
        handleExpectedViewD3(expectedViewData?.data.data, {
          startDate,
          endDate,
        }),
      [JSON.stringify(expectedViewData)],
    ),
    expectedArea: useMemo(
      () =>
        handleExpectedViewAreaD3(expectedViewData?.data.data, {
          startDate,
          endDate,
        }),
      [JSON.stringify(expectedViewData)],
    ),
  };
};

export const useDailyViewV2 = ({
  keyword,
  relword,
}: {
  keyword: string;
  relword: string | null;
}) => {
  const { data: dailyViewData } = useGetDailyViewV2({
    keyword,
    relword,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  // const handleDailyViewDataCallback = formatToApexChart(handleDailyViewData, {
  //   name: '일일조회수',
  //   type: 'line',
  // });

  return useMemo(
    () => handleDailyViewDataD3(dailyViewData, { startDate, endDate }),
    [JSON.stringify(dailyViewData)],
  );
};

export const useDailyView = ({
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

  // const handleDailyViewDataCallback = formatToApexChart(handleDailyViewData, {
  //   name: '일일조회수',
  //   type: 'line',
  // });

  return useMemo(
    () => handleDailyViewDataD3(dailyViewData.flat(), { startDate, endDate }),
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

export const useDailyVideoCount = ({
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

  // const handleDailyViewDataCallback = formatToApexChart(handleDailyVideoCount, {
  //   name: '영상 수',
  //   type: 'bar',
  // });

  return useMemo(
    () => handleDailyVideoCountD3(dailyViewData.flat(), { startDate, endDate }),
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
