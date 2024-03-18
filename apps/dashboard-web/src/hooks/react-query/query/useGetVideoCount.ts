import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

/**
 * 지정한 탐색어와 연관어들의 video 갯수를 가져오기 위한 hook입니다.
 * @param param 탐색어와 연관어를 파라미터로 받습니다.
 * @param queryOptions
 * @returns
 */
const useGetVideoCount = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getAccumulateVideo>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const { data } = useGetRelWords(keyword);

  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  console.log(clusters);

  const queryResult = apiClient(1).video.getAccumulateVideo.useQuery(
    VIDEO_COUNT_KEY.list([
      {
        relword: relword,
        keyword: keyword,
        startDate,
        endDate,
      },
    ]),

    {
      params: {
        clusterNumber: clusters.join(','),
      },
      query: {
        search: keyword!,
        related: relword!,
        from: startDate,
        to: endDate,
      },
    },
    {
      ...queryOptions,
      enabled: !!relword && !!startDate && !!endDate && !!data,
    },
  );

  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;
  return {
    ...queryResult,
    data: [requiredQueryResult?.body.data],
  };
};

export default useGetVideoCount;
