import type { apiRouter } from '@dothis/dto';
import { QueryClient } from '@tanstack/query-core';
import { useQueryClient } from '@tanstack/react-query';
import type { UseQueryOptions } from '@ts-rest/react-query';

import {
  DURATION_VIEWS_KEY,
  NEWS_DATA_KEY,
  VIDEODATA_KEY,
} from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

interface PaginationQuery {
  limit?: number;
  page?: number;
}

interface DateQuery {
  from?: string;
  to?: string;
}

interface KeywordQuery {
  searchKeyword: string;
  relatedkeyword: string | null;
}

const useGetSingleVideo = (
  {
    searchKeyword,
    relatedkeyword,
    from,
    to,
    limit,
    page,
    extraQueryKey,
  }: KeywordQuery & DateQuery & PaginationQuery & { extraQueryKey: any },
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getVideoPage>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResult = apiClient(2).video.getVideoPage.useQuery(
    VIDEODATA_KEY.list([
      { searchKeyword, relatedkeyword, from, to, limit, page, extraQueryKey },
    ]),
    {
      query: {
        search: searchKeyword,
        related: relatedkeyword ?? undefined,
        // from: from ?? startDate,
        // to: to ?? endDate,
        limit: '1',
        page: page ? String(page) : undefined,
        order: 'desc',
        sort: 'video_views',
      },
    },
    {
      ...queryOptions,
      staleTime: Infinity,
      //   onSuccess: (data) => {
      //     console.log(cachedData);
      //     if (cachedData) {
      //       queryOptions?.onSuccess?.(data);
      //     }
      //   },

      enabled: (queryOptions?.enabled ?? false) && !!searchKeyword,
    },
  );

  return { ...queryResult, data: queryResult.data?.body.data.data[0] };
};

export default useGetSingleVideo;
