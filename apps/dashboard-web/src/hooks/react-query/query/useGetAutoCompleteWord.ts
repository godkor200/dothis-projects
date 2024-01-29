import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { AUTO_COMPLETEWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

/**
 * 해당 query는 검색창 인풋에서 자동완성 키워드를 가져올 때 사용하는 hook입니다.
 * @param word 검색할 단어 파라미터입니다.
 * @param queryOptions
 * @returns
 */
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

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetAutoCompleteWord;
