import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetExpectedView = () => {
  const { data } = useGetRelWords();

  const selectedRelWord = useSelectedRelWord();

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(1).expectViews.getExpectedViews.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: [
          'expectedView',
          { clusterNumber, relword: selectedRelWord, keyword: data?.keyword },
        ],
        params: {
          clusterNumber,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-10-11',
          to: '2023-10-17',
        },
        enabled: !!data && !!selectedRelWord,
      };
    }),
  });

  const isLoading = queryResults.some((result) => result.isLoading);

  return {
    isLoading,
    data: queryResults.map((result) => result.data?.body),
  };
};

export default useGetExpectedView;
