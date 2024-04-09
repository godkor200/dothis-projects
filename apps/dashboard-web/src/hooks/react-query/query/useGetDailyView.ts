import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { DAILYVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

import type { DeepRequired } from './common';
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
  queryOptions?: UseQueryOptions<typeof apiRouter.hits.getDailyViewsV1>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusters = getRelatedClusterArray();

  const queryResults = apiClient(1).hits.getDailyViewsV1.useQueries({
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
          clusterNumber: String(clusterNumber),
        },
        query: {
          keyword: keyword!,
          relationKeyword: relword!,
          from: startDate,
          to: endDate,
          search: keyword!,
          related: relword!,
        },
        ...queryOptions,
        enabled: !!data && !!relword && !!startDate && !!endDate,
      };
    }),
  });

  const requiredQueryResult = queryResults as DeepRequired<typeof queryResults>;
  // const isLoading = queryResults.some((result) => result.isLoading);
  const isLoading = requiredQueryResult.map((item) => item.isLoading);

  return {
    isLoading,
    data: requiredQueryResult.map((result) => result.data?.body.data),
  };
};

export default useGetDailyView;
