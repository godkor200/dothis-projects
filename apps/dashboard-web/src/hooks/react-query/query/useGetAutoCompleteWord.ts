import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

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
    typeof apiRouter.relatedWords.getAutoCompleteWords
  >,
) => {
  const queryResult = apiClient(2).relatedWords.getAutoCompleteWords.useQuery(
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
