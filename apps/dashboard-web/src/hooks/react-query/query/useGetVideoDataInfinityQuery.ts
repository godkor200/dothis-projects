import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoDataInfinityQuery = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  lastIndex_ID?: string,
  queryOptions?: UseInfiniteQueryOptions<typeof apiRouter.video.getVideoPageV2>,
) => {
  const { data } = useGetRelWords(keyword);

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(2).video.getVideoPageV2.useInfiniteQuery(
    VIDEODATA_KEY.list([
      {
        relword: relword,
        keyword: keyword,
      },
    ]),

    /**
     * 저희는 pageParam의 대한 정보를 api 요청할 때 보내고 있지는않아서
     */
    ({ pageParam = 0 }) => ({
      query: {
        last: lastIndex_ID ? lastIndex_ID : undefined,
        limit: 10,
        related: relword!,
        search: keyword!,
        cluster: clusters.join(','),
      },
    }),
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage.body.data.data.length);
        return lastPage.body.data.data.length < 10 || allPages.length > 4
          ? false
          : true;
      },

      enabled: !!data && !!relword,
    },
  );

  return {
    ...queryResults,
    data: queryResults.data?.pages.flatMap((item) => item.body.data.data),
  };
};

export default useGetVideoDataInfinityQuery;
