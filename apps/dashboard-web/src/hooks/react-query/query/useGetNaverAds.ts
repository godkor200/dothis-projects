'use client';

import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { NAVER_ADS_KEY } from '@/constants/querykey';
import type { TKeywords } from '@/types/common';

export type NaverAdsAPI_Response = {
  data: { keywordList: Array<NaverAdsAPI_Results> };
};

export type NaverAdsAPI_Results = {
  relKeyword: string;
  monthlyPcQcCnt: number | string;
  monthlyMobileQcCnt: number | string;
};

const useGetNaverAds = ({
  baseKeyword,
  relatedKeyword,
}: TKeywords): UseQueryResult<NaverAdsAPI_Response> => {
  const queryKeyword = relatedKeyword ?? baseKeyword;

  return useQuery(
    NAVER_ADS_KEY.list([{ baseKeyword }]),
    () => queryFn({ baseKeyword: queryKeyword }),
    {},
  );
};

export default useGetNaverAds;

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
  console.log(data);

  return data.data;
};
