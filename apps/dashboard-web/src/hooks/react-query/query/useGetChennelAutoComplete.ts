import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import {
  AUTO_COMPLETEWORD_KEY,
  CHANNEL_AUTO_COMPLETE_KEY,
} from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

/**
 * 해당 query는 검색창 인풋에서 자동완성 키워드를 가져올 때 사용하는 hook입니다.
 * @param word 검색할 단어 파라미터입니다.
 * @param queryOptions
 * @returns
 */
const useGetChennelAutoComplete = (
  word: string,
  queryOptions?: UseQueryOptions<
    typeof apiRouter.channel.autocompleteChannelName
  >,
) => {
  const queryResult = apiClient(1).channel.autocompleteChannelName.useQuery(
    [CHANNEL_AUTO_COMPLETE_KEY.all, word],
    {
      params: { channelName: word },
    },
    {
      ...queryOptions,
      enabled: !!word,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetChennelAutoComplete;
