import { useQueries } from '@tanstack/react-query';
import axios from 'axios';

import { NAVER_ADS_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';

import type { NaverAdsAPI_Response } from '../react-query/query/useGetNaverAds';

const useGetNaverAdsQueries = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  return useQueries({
    queries: relatedKeywords.map((relatedKeyword) => ({
      queryKey: NAVER_ADS_KEY.list([{ baseKeyword: relatedKeyword }]),
      queryFn: () => queryFn({ baseKeyword: relatedKeyword }),
    })),
  });
};

export default useGetNaverAdsQueries;

const queryFn = async ({
  baseKeyword,
}: {
  baseKeyword: string;
}): Promise<NaverAdsAPI_Response> => {
  const data = await axios.get<NaverAdsAPI_Response>('/api/naver-ads', {
    params: {
      baseKeyword,
    },
  });

  return data.data;
};
