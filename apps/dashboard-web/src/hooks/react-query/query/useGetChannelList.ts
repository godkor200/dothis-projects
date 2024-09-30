import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { CHANNEL_LIST_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetChannelList = (
  word?: string,

  queryOptions?: UseQueryOptions<typeof apiRouter.channel.getChannelList>,
) => {
  const queryResult = apiClient(1).channel.getChannelList.useQuery(
    [CHANNEL_LIST_KEY.all, word],
    {
      query: {
        channelCluster,
        channelSubscriber: '500000to999999',
        sort: 'channel_subscriber',
        limit: 50,
      },
    },
    {
      ...queryOptions,
      //   enabled: !!word,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body,
  };
};

export default useGetChannelList;
