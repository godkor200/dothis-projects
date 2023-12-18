import { EXPECTEDVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetExpectedView = () => {
  const { data } = useGetRelWords();

  const seletedWord = useSelectedWord();

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
            relword: seletedWord.relword,
            keyword: seletedWord.keyword,
            startDate,
            endDate,
          },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          keyword: seletedWord.keyword!,
          relationKeyword: seletedWord.relword!,
          from: startDate,
          to: endDate,
        },
        enabled: !!data && !!seletedWord.relword && !!startDate && !!endDate,
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
