import { useMemo } from 'react';

import useDailyViewQueries from '@/app/(keyword)/keyword/[keyword]/[related_word]/summary/useDailyViewQueries';
import useNaverSearchQueries from '@/app/(keyword)/keyword/[keyword]/[related_word]/summary/useNaverSearchQueries';
import useVideoUploadCountQueries from '@/app/(keyword)/keyword/[keyword]/[related_word]/summary/useVideoUploadCountQueries';
import { useEndDate, useStartDate } from '@/store/dateStore';
import type { TKeywords } from '@/types/common';
import {
  formatToApexChart,
  handleAveragePerformanceData,
  handleDailyVideoCount,
  handleDailyVideoCountD3,
  handleDailyViewData,
  handleDailyViewDataD3,
  handleDailyViewListD3,
  handleExpectedViewAreaD3,
  handleExpectedViewD3,
  handleNaverSearchCountD3,
  handleNaverSearchRatio,
  handleNaverSearchRatioD3,
  handleScopePerformanceData,
  handleVideoUploadCountD3,
} from '@/utils/contents/chart';
import { calculateNormalizedSearchCount } from '@/utils/naver-search/common';

import useGetDailyExpectedView from '../react-query/query/useGetDailyExpectedView';
import useGetDailyView from '../react-query/query/useGetDailyView';
import useGetDailyViewV2 from '../react-query/query/useGetDailyViewV2';
import useGetNaverSearchRatio from '../react-query/query/useGetNaverSearchRatio';
import useGetPerformanceData from '../react-query/query/useGetPerformanceData';
import useGetVideoUploadCount from '../react-query/query/useGetVideoUploadCount';
import useNaverDataHandler from './useNaverDataHandler';

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

export const useSearchRatioFormmaterListD3 = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const queryResults = useNaverSearchQueries({ baseKeyword, relatedKeywords });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () => ({
      chartDataList: queryResults.map((query) =>
        handleNaverSearchRatioD3(query.data?.results, {
          startDate,
          endDate,
        }),
      ),
      keywordList: queryResults.map(
        (query) => query.data?.results[0].keywords[1],
      ),
    }),
    [JSON.stringify(queryResults)],
  );
};

export const useSearchCountFormmaterD3 = ({
  baseKeyword,
  relatedKeyword,
}: TKeywords) => {
  //해당 부분에 이제 ads 및 searchRatio api 불러오고 계산 하고 메모이제이션 실행
  // 중요한 그래프에 맞는 데이터를 구하도록 실행
  //또한 해당 값들은(합산퍼센트  및 총 월단위 데이터) 계산 쓰일 수 있으니 hook으로 해당 값들을 구해오는 코드를 만들어주자

  const { dailyRatioList, totalSearchRatio, totalQcCount } =
    useNaverDataHandler({ baseKeyword, relatedKeyword });

  const startDate = useStartDate();
  const endDate = useEndDate();

  const createSearchCountArgs = ({
    totalSearchRatio,
    totalQcCount,
  }: {
    totalSearchRatio: number;
    totalQcCount: number;
  }) => {
    return (dailyRatio: number) => {
      return calculateNormalizedSearchCount({
        dailyRatio,
        totalQcCount,
        totalRatio: totalSearchRatio,
      });
    };
  };

  return useMemo(
    () =>
      handleNaverSearchCountD3(
        dailyRatioList,
        createSearchCountArgs({ totalQcCount, totalSearchRatio }),
        {
          startDate,
          endDate,
        },
      ),
    [JSON.stringify(dailyRatioList)],
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

export const useUploadVideoCountFormatterListD3 = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const { data } = useVideoUploadCountQueries({
    baseKeyword,
    relatedKeywords,
  });

  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () => ({
      chartDataList: data.map((query) =>
        handleVideoUploadCountD3(query.data, { startDate, endDate }),
      ),
      keywordList: data.map((query) => query.keyword),
    }),
    [JSON.stringify(data)],
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

export const useDailyViewList = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const { data } = useDailyViewQueries({
    baseKeyword,
    relatedKeywords,
  });
  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () => ({
      chartDataList: data.map((item) =>
        handleDailyViewListD3(item, { startDate, endDate }),
      ),
      keywordList: data.map((item) => item.keyword),
    }),
    [JSON.stringify(data)],
  );
};

export const useExpectedViewList = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const { data } = useDailyViewQueries({
    baseKeyword,
    relatedKeywords,
  });
  const startDate = useStartDate();
  const endDate = useEndDate();

  return useMemo(
    () => ({
      chartDataList: data.map((item) =>
        handleExpectedViewD3(item.data, { startDate, endDate }),
      ),
      keywordList: data.map((item) => item.keyword),
    }),
    [JSON.stringify(data)],
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
