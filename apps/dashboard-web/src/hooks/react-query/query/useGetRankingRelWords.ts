import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import { RANK_RELATIONWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

/**
 * params로 들어온 keyword에 대해 기대조회수에 기반한 연관어를 가져올 수 있는 api 쿼리 훅입니다.
 * @param keyword 연관어를 가져올 keyword
 * @param queryOptions
 * @returns 해당 data에 기대조회수를 기반으로 정렬을 시킨 뒤 연관어(string) 데이터들만 배열형식으로 반환합니다.
 * @특이사항 현재 데이터를 수집하는 요청과 겹쳐서 높은확률로 429에러(Trying to create too many scroll contexts)가 response로 들어옵니다. 조금이라도 그것을 방지하기 위해 retry를 걸어주었습니다.
 */
const useGetRankingRelWords = (
  keyword: string | null,
  queryOptions?: UseQueryOptions<
    typeof apiRouter.relatedWords.rankingRelatedWords
  >,
) => {
  const queryResult = apiClient(1).relatedWords.rankingRelatedWords.useQuery(
    RANK_RELATIONWORD_KEY.list([{ keyword }]),
    { params: { search: keyword! } },
    { ...queryOptions, enabled: !!keyword, retry: 3 },
  );

  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body.data.ranking
      .sort((a, b) => b.expectedViews - a.expectedViews)
      .map((item) => item.word),
  };
};

export default useGetRankingRelWords;
