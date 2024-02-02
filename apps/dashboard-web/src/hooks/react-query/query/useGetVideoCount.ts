import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

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
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getAccVideo>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResult = apiClient(2).video.getAccVideo.useQuery(
    VIDEO_COUNT_KEY.list([
      {
        relword: relword,
        keyword: keyword,
        startDate,
        endDate,
      },
    ]),

    {
      query: {
        search: keyword!,
        related: relword!,
        from: startDate,
        to: endDate,
      },
    },
    {
      ...queryOptions,
      enabled: !!relword && !!startDate && !!endDate,
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
