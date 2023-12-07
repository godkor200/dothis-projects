import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetVideoCount = () => {
  const selectedRelWord = useSelectedRelWord();
  const { data } = useGetRelWords();

  const startDate = useStartDate();

  const endDate = useEndDate();

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(2).video.getAccVideo.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: VIDEO_COUNT_KEY.list([
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

  return {
    ...queryResults,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetVideoCount;
