import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoData = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getVideo>,
) => {
  const { data } = useGetRelWords(keyword);

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(1).video.getVideo.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: VIDEODATA_KEY.list([
          {
            clusterNumber,
            relword: relword,
            keyword: keyword,
          },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          // last:0,
          limit: 5,
          related: relword!,
          search: keyword!,
        },
        ...queryOptions,
        enabled: !!data && !!relword,
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
