import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import type { DeepRequired } from './common';
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
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getVideoPage>,
) => {
  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusters = getRelatedClusterArray();

  const queryResults = apiClient(1).video.getVideoPage.useQueries({
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
          limit: String(5),
          related: relword!,
          search: keyword!,
        },
        ...queryOptions,
        enabled: (queryOptions?.enabled ?? false) && !!data && !!relword,
      };
    }),
  });

  const requiredQueryResult = queryResults as DeepRequired<typeof queryResults>;

  const isLoading = requiredQueryResult.some((result) => result.isLoading);

  return {
    isLoading,
    data: requiredQueryResult.map((result) => result.data?.body.data),
  };
};

export default useGetVideoData;
