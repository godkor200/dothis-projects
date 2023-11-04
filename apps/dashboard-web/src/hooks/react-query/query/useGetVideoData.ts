import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoData = () => {
  const { data } = useGetRelWords();
  const selectedRelWord = useSelectedRelWord();
  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(1).video.getVideo.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: [...videoKeys.video, clusterNumber],
        params: {
          clusterNumber,
        },
        query: {
          // last:0,
          limit: 5,
          related: '돼지고기',
          search: '고기',
        },
        enabled: !!data && !!selectedRelWord,
      };
    }),
  });

  const isLoading = queryResults.some((result) => result.isLoading);

  return {
    isLoading,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetVideoData;
