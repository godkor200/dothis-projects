'use client';

import { COMBINE_DAILY_EXPECTED_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

const useGetDailyExpectedView = ({
  baseKeyword,
  relatedKeyword,
}: {
  baseKeyword: string;
  relatedKeyword: string | null;
}) => {
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
      enabled: !!startDate && !!endDate && !!baseKeyword,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body,
  };
};

export default useGetDailyExpectedView;
