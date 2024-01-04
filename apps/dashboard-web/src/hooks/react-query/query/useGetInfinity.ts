import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetInfinity = (
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

  console.log(lastIndex_ID);

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(2).video.getVideoPageV2.useInfiniteQuery(
    VIDEODATA_KEY.list([
      {
        relword: relword,
        keyword: keyword,
        page: page,
      },
    ]),

    ({ pageParam = 1 }) => pageParam,
  );

  queryResults.isPreviousData;
  return {
    ...queryResults,
    data: queryResults.data,
  };
};

export default useGetInfinity;
