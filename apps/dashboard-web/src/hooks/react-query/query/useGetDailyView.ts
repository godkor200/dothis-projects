import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { DAILYVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

/**
 * 지정한 탐색어와 연관어들의 일일조회수를 가져오기 위한 hook입니다.
 * @param param 탐색어와 연관어를 파라미터로 받습니다.
 * @param queryOptions
 * @returns
 */
const useGetDailyView = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.dailyViews.getDailyViews>,
) => {
  const { data } = useGetRelWords(keyword);

  const startDate = useStartDate();

  const endDate = useEndDate();

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(3).dailyViews.getDailyViews.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: DAILYVIEW_KEY.list([
          {
            clusterNumber,
            relword,
            keyword,
            startDate,
            endDate,
          },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          keyword: keyword!,
          relationKeyword: relword!,
          from: startDate,
          to: endDate,
        },
        ...queryOptions,
        enabled: !!data && !!relword && !!startDate && !!endDate,
      };
    }),
  });

  // const isLoading = queryResults.some((result) => result.isLoading);
  const isLoading = queryResults.map((item) => item.isLoading);

  return {
    isLoading,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetDailyView;
