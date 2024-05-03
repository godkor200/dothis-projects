import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import {
  AUTO_COMPLETEWORD_KEY,
  RANK_RELATIONWORD_KEY,
} from '@/constants/querykey';
import { useIsTokenRequired } from '@/store/authStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetUserInfo from './useGetUserInfo';

/**
 * params로 들어온 keyword에 대한 기대조회수에 기반한 연관어를 가져올 수 있는 api 쿼리 훅입니다.
 * @param keyword 연관어를 가져올 keyword
 * @param queryOptions
 * @returns 해당 data에 기대조회수를 기반으로 정렬을 시킨 뒤 연관어(string) 데이터들만 배열형식으로 반환합니다.
 * @특이사항 현재 데이터를 수집하는 요청과 겹쳐서 높은확률로 429에러(Trying to create too many scroll contexts)가 response로 들어옵니다. 조금이라도 그것을 방지하기 위해 retry를 걸어주었습니다.
 */

const useGetRankingWordList = (
  keyword: string[],
  queryOptions?: UseQueryOptions<
    typeof apiRouter.relatedWords.rankingRelatedWords
  >,
) => {
  const { isLoading: userLoading } = useGetUserInfo();

  const isTokenRequired = useIsTokenRequired();

  const queryResults = apiClient(1).relatedWords.rankingRelatedWords.useQueries(
    {
      queries: keyword.map((keyword) => {
        return {
          queryKey: RANK_RELATIONWORD_KEY.list([{ keyword }]),
          params: { search: keyword },
          ...queryOptions,
          enabled:
            isTokenRequired !== null && keyword.length > 0 && !userLoading,
          retry: 3,
          select(data) {
            return data;
          },
        };
      }),
    },
  );
  const requiredQueryResults = queryResults as DeepRequired<
    typeof queryResults
  >;

  const keywordArray = [...keyword];

  const removeKeywordList: string[] = [];

  const filterArray = requiredQueryResults.filter((queryResult, index) => {
    if (queryResult.data === undefined) {
      removeKeywordList.push(keywordArray[index]);
    }

    return queryResult.data !== undefined;
  });

  const keywordList = keywordArray.filter(
    (item) => removeKeywordList.indexOf(item) === -1,
  );

  const flattenArray = filterArray.flatMap((queryResults, index) => {
    return (
      queryResults.data?.body.data.ranking.map((item) => ({
        ...item,
        keyword: keywordList[index],
        // keyword: queryResults.data.body.data.keyword, 현재 프로퍼티가 추가되어서 이런식으로 사용해도 된다.
      })) || []
    );
  });

  const sortArray = [...flattenArray].sort(
    (a, b) => b.sortFigure - a.sortFigure,
  );

  const isLoading = requiredQueryResults.some((query) => query.isLoading);

  const isError = requiredQueryResults.every((query) => query.isError);

  const isErrorKeyword = requiredQueryResults
    .map((item, index) => (item.isError === true ? keywordArray[index] : null))
    .filter(Boolean);

  return {
    isLoading,
    isError,
    isErrorKeyword,
    data: sortArray.map((item) => ({
      relword: item.word,
      keyword: item.keyword,
    })),
  };
};

export default useGetRankingWordList;
