import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import useGetRelWords from '@/query/user/useGetRelWords';
import { apiClient } from '@/utils/api/apiClient';
import { convertKeywordsToArray } from '@/utils/keyword';

const useRelWord = () => {
  const { data } = useGetRelWords();

  return {
    relWordList: convertKeywordsToArray(data?.relWords),
  };
};

export default useRelWord;
