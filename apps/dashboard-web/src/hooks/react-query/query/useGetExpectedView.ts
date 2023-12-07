import { EXPECTEDVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetExpectedView = () => {
  const { data } = useGetRelWords();

  const selectedRelWord = useSelectedRelWord();

  const startDate = useStartDate();

  const endDate = useEndDate();

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(2).expectViews.getExpectedViews.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: EXPECTEDVIEW_KEY.list([
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

export default useGetExpectedView;
