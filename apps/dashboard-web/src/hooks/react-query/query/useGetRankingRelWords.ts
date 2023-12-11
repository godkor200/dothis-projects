import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import {
  AUTO_COMPLETEWORD_KEY,
  RANK_RELATIONWORD_KEY,
} from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetRankingRelWords = (
  keyword: string,
  queryOptions?: UseQueryOptions<typeof apiRouter.relwords.rankRel>,
) => {
  const queryResult = apiClient(1).relwords.rankRel.useQuery(
    RANK_RELATIONWORD_KEY.list([{ keyword }]),
    { params: { keyword } },
    { enabled: !!keyword, ...queryOptions },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data
      .sort((a, b) => b.expectedViews - a.expectedViews)
      .map((item) => item.word),
  };
};

export default useGetRankingRelWords;
