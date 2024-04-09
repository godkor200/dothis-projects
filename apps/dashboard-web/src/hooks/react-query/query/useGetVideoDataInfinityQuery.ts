import type { apiRouter } from '@dothis/dto';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import type { DeepRequired } from './common';
import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

/**
 * infinityQuery로써 무한 scroll 형식에 맞도록 생성된 hook
 * 지정한 탐색어와 연관어들의 video를 가져오는 hook입니다.
 * @param param 탐색어와 연관어를 파라미터로 받습니다
 * @param lastIndex_ID infiniteScroll에서 다음 조회를 시작할 Index_Id입니다 (존재하지 않을경우 처음부터 조회)
 * @param queryOptions
 * @returns
 */
const useGetVideoDataInfinityQuery = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  lastIndex_ID?: string,
  queryOptions?: UseInfiniteQueryOptions<typeof apiRouter.video.getVideoPageV1>,
) => {
  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusters = getRelatedClusterArray();

  const queryResults = apiClient(1).video.getVideoPageV1.useInfiniteQuery(
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
      params: {
        clusterNumber: clusters.join(','),
      },
      query: {
        limit: String(10),
        page: pageParam ? pageParam + 1 : 1,
        related: relword!,
        search: keyword!,
      },
    }),
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        return (lastPage.body.data?.data &&
          lastPage.body?.data?.data.length < 10) ||
          allPages.length > 4
          ? false
          : true;
      },

      enabled: !!data && !!relword,
    },
  );

  const requiredQueryResult = queryResults.data as DeepRequired<
    typeof queryResults.data
  >;

  return {
    ...queryResults,
    data: requiredQueryResult?.pages.flatMap((item) => item.body.data.data),
  };
};

export default useGetVideoDataInfinityQuery;
