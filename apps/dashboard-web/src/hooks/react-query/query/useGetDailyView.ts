import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { DAILYVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

import type { DeepRequired } from './common';
import useGetRelWords from './useGetRelWords';

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
