'use client';

import { apiClient } from '@/utils/api/apiClient';

const SSTTEST = () => {
  const queryResults = apiClient(2).dailyViews.getDailyViews.useQueries({
    queries: ['1', '2', '3', '4', '5'].map((clusterNumber) => {
      return {
        queryKey: ['test', clusterNumber, '먹방'],
        params: {
          clusterNumber,
        },
        query: {
          keyword: '먹방',
          relationKeyword: '불닭',
          from: '2023-10-11',
          to: '2023-10-17',
        },
        suspense: true,
      };
    }),
  });

  console.log(queryResults);

  return (
    <>{queryResults.map((tt) => tt.data?.body.data.map((ot) => ot.date))}</>
  );
};

export default SSTTEST;
