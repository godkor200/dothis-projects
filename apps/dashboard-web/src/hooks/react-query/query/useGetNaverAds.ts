'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { NAVER_ADS_KEY } from '@/constants/querykey';

const useGetNaverAds = ({ baseKeyword }: { baseKeyword: string }) => {
  return useQuery(
    NAVER_ADS_KEY.list([{ baseKeyword }]),
    () => queryFn({ baseKeyword }),
    {},
  );
};

export default useGetNaverAds;

const queryFn = async ({ baseKeyword }: { baseKeyword: string }) => {
  const data = await axios.get('/api/naver-ads', {
    params: {
      baseKeyword,
    },
  });

  return data.data;
};
