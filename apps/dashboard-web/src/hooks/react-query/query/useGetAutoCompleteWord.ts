import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { AUTO_COMPLETEWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetAutoCompleteWord = (
  word: string,
  queryOptions?: UseQueryOptions<
    typeof apiRouter.relwords.getAutoCompleteWords
  >,
) => {
  const queryResult = apiClient(2).relwords.getAutoCompleteWords.useQuery(
    [AUTO_COMPLETEWORD_KEY.all, word],
    { params: { word } },
    { enabled: !!word, ...queryOptions },
  );

  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body.data,
  };
};

export default useGetAutoCompleteWord;
