import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoData = (
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getVideo>,
) => {
  const { data } = useGetRelWords();
  const selectedRelWord = useSelectedRelWord();
  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResult = apiClient(1).video.getVideo.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: [...videoKeys.video, clusterNumber],
        params: {
          clusterNumber,
        },
        query: {
          // last:0,
          limit: 10,
          // related:
          search: selectedRelWord!,
        },
        ...queryOptions,
      };
    }),
  });
};
