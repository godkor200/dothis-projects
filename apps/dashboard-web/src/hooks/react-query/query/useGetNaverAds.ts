'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { NAVER_ADS_KEY } from '@/constants/querykey';

const useGetNaverAds = () => {
  return useQuery(NAVER_ADS_KEY.detail([{ test: 1 }]), () => queryFn(), {});
};

export default useGetNaverAds;

const queryFn = async () => {
  const data = await axios.get('/api/naver-ads', {});

  return data.data;
};
