import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

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

  const queryResults = apiClient(2).video.getAccVideo.useQuery(
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

  return {
    ...queryResults,
    data: [queryResults.data?.body.data],
  };
};

export default useGetVideoCount;
