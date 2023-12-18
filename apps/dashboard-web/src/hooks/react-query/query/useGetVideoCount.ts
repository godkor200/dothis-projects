import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetVideoCount = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getAccVideo>,
) => {
  const { data } = useGetRelWords(keyword);

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
            relword: relword,
            keyword: keyword,
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

  return {
    ...queryResults,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetVideoCount;
