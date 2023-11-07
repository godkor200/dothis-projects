import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { apiClient } from '@/utils/api/apiClient';

const useGetAutoCompleteWord = (
  word: string,
  queryOptions?: UseQueryOptions<
    typeof apiRouter.relwords.getAutoCompleteWords
  >,
) => {
  const queryResult = apiClient(2).relwords.getAutoCompleteWords.useQuery(
    ['autoComplete', word],
    { params: { word } },
    { enabled: !!word, ...queryOptions },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetAutoCompleteWord;
