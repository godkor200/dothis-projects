import { useQueries } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { NAVER_SEARCH_RATIO_KEY } from '@/constants/querykey';
import type { NaverAPI_Response } from '@/hooks/react-query/query/useGetNaverSearchRatio';
import { useEndDate, useStartDate } from '@/store/dateStore';

const useNaverSearchQueries = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const endDate = useEndDate();

  const startDate = dayjs(endDate).subtract(29, 'day').format('YYYY-MM-DD');

  return useQueries({
    queries: relatedKeywords.map((relatedKeyword) => ({
      queryKey: NAVER_SEARCH_RATIO_KEY.list([
        {
          baseKeyword,
          relatedKeyword,
          startDate,
          endDate,
        },
      ]),
      queryFn: () =>
        queryFn({
          keyword: baseKeyword,
          relword: relatedKeyword,
          startDate,
          endDate,
        }),

      enabled: !!baseKeyword && !!startDate && !!endDate && !!relatedKeyword,
    })),
  });
};

export default useNaverSearchQueries;

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
