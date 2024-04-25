import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { INFLUENTIAL_CHANNEL_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

const useGetInfluentialChannel = (
  {
    keyword,
    relword,
  }: {
    keyword: string | null;
    relword: string | null;
  },
  queryOptions?: UseQueryOptions<typeof apiRouter.channel.getInfluentialList>,
) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const { data, getRelatedClusterArray } = useGetRelWords(keyword);

  const clusters = getRelatedClusterArray();

  const queryResult = apiClient(1).channel.getInfluentialList.useQuery(
    INFLUENTIAL_CHANNEL_KEY.list([
      {
        relword,
        keyword,
        startDate,
        endDate,
      },
    ]),

    {
      query: {
        search: keyword!,
        related: relword!,
        from: startDate,
        to: endDate,
      },
    },
    {
      ...queryOptions,
      enabled: !!relword && !!startDate && !!endDate,
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

export default useGetInfluentialChannel;
