import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

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
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getVideoPageV2>,
) => {
  const { data } = useGetRelWords(keyword);

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(2).video.getVideoPageV2.useQuery(
    VIDEODATA_KEY.list([
      {
        relword: relword,
        keyword: keyword,
        page: page,
      },
    ]),
    {
      query: {
        last: lastIndex_ID ? lastIndex_ID : undefined,
        limit: 10,
        related: relword!,
        search: keyword!,
        cluster: clusters.join(','),
      },
    },
    { ...queryOptions, enabled: !!data && !!relword },
  );

  return {
    ...queryResults,
    data: queryResults.data?.body,
  };
};

export default useGetVideoPagination;
