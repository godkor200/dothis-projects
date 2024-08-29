import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import type { DeepRequired } from './common';
import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoPagination = (
  page: number,
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  lastIndex_ID?: string,
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getVideoPage>,
) => {
  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusters = getRelatedClusterArray();

  const queryResults = apiClient(1).video.getVideoPage.useQuery(
    VIDEODATA_KEY.list([
      {
        relword: relword,
        keyword: keyword,
        page: page,
      },
    ]),
    {
      query: {
        limit: String(10),
        related: relword!,
        search: keyword!,
        // cluster: clusters.join(','),
      },
    },
    { ...queryOptions, enabled: !!data && !!relword },
  );

  const requiredQueryResult = queryResults.data as DeepRequired<
    typeof queryResults.data
  >;

  return {
    ...queryResults,
    data: requiredQueryResult?.body,
  };
};

export default useGetVideoPagination;
