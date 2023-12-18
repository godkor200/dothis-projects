import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetVideoCount = () => {
  const seletedWord = useSelectedWord();
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

  return {
    ...queryResults,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetVideoCount;
