'use client';

import type { DeepRequired } from '@/hooks/react-query/query/common';
import { apiClient } from '@/utils/api/apiClient';

const SSTTEST = () => {
  console.log('test');
  const queryResults = apiClient(2).hits.getDailyViews.useQueries({
    queries: ['1', '2', '3', '4', '5'].map((clusterNumber) => {
      return {
        queryKey: ['test', clusterNumber, '먹방'],
        params: {
          clusterNumber,
        },
        query: {
          search: '먹방',
          related: '불닭',
          from: '2023-10-11',
          to: '2023-10-17',
        },
        suspense: true,
      };
    }),
  });

  const requiredQueryResult = queryResults as DeepRequired<typeof queryResults>;

  return (
    <>
      {requiredQueryResult.map((tt) => tt.data?.body.data.map((ot) => ot.date))}
    </>
  );
};

export default SSTTEST;
