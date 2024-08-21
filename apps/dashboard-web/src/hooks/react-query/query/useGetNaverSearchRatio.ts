import type { QueryOptions } from '@tanstack/query-core';
import type { UseQueryResult } from '@tanstack/react-query';
import { useQueries, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { NAVER_SEARCH_RATIO_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';

export type NaverAPI_Response = {
  startDate: string;
  endDate: string;
  timeUnit: string;
  results: Array<NaverAPI_Results>;
};

export type NaverAPI_Results = {
  title: string;
  keywords: Array<string>;
  data: Array<{ period: string; ratio: string }>;
};

const useGetNaverSearchRatio = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: QueryOptions,
): UseQueryResult<NaverAPI_Response> => {
  const endDate = useEndDate();

  const startDate = dayjs(endDate).subtract(29, 'day').format('YYYY-MM-DD');

  return useQuery(
    NAVER_SEARCH_RATIO_KEY.list([
      {
        baseKeyword: keyword,
        relatedKeyword: relword,
        startDate,
        endDate,
      },
    ]),
    () =>
      queryFn({
        keyword: keyword!,
        relword: relword,
        startDate,
        endDate,
      }),
    {
      ...queryOptions,
      enabled: !!keyword && !!startDate && !!endDate,
    },
  );
};

export default useGetNaverSearchRatio;

const queryFn = async ({
  keyword,
  relword,
  startDate,
  endDate,
}: {
  keyword: string;
  relword: string | null;
  startDate: string;
  endDate: string;
}): Promise<NaverAPI_Response> => {
  const response = await axios.post<NaverAPI_Response>('/api/search', {
    keyword,
    relword,
    startDate,
    endDate,
  });
  return response.data;
};
