'use client';

import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { COMBINE_DAILY_EXPECTED_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

const useGetDailyExpectedView = (
  {
    baseKeyword,
    relatedKeyword,
  }: {
    baseKeyword: string;
    relatedKeyword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.hits.getAnalysisHits>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResult = apiClient(1).hits.getAnalysisHits.useQuery(
    COMBINE_DAILY_EXPECTED_KEY.list([
      {
        baseKeyword,
        relatedKeyword,
        startDate,
        endDate,
      },
    ]),

    {
      query: {
        search: baseKeyword,
        related: relatedKeyword ?? undefined,
        from: startDate,
        to: endDate,
      },
    },
    {
      ...queryOptions,
      enabled:
        // enbled -> 전달 인자 (argument)는 false값으로 정의해서 들어와야합니다.
        (queryOptions?.enabled ?? true) &&
        !!startDate &&
        !!endDate &&
        !!baseKeyword,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body,
  };
};

export default useGetDailyExpectedView;
