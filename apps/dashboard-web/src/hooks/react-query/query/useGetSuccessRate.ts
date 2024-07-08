import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { SUCCESS_RATE_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetSuccessRate = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.hits.getProbabilitySuccess>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusters = getRelatedClusterArray();

  const queryResult = apiClient(1).hits.getProbabilitySuccess.useQuery(
    SUCCESS_RATE_KEY.list([
      {
        relword,
        keyword,
        startDate,
        endDate,
      },
    ]),

    {
      params: {
        clusterNumber: clusters.join(','),
      },
      query: {
        search: keyword!,
        related: relword!,
        from: startDate,
        to: endDate,
      },
    },
    {
      ...queryOptions,
      enabled: !!relword && !!startDate && !!endDate && !!clusters,
    },
  );

  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body.data,
  };
};

export default useGetSuccessRate;
