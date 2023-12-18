import { DAILYVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetDailyView = (keyword: string, relword: string) => {
  const { data } = useGetRelWords(keyword);

  const selectedRelWord = useSelectedWord();

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
            relword: selectedRelWord,
            keyword: data?.keyword,
            startDate,
            endDate,
          },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: startDate,
          to: endDate,
        },
        enabled: !!data && !!selectedRelWord && !!startDate && !!endDate,
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
