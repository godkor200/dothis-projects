import type { DeepRequired } from 'react-hook-form';

import { STORYBOARD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetStoryBoard = (storyBoardId: string) => {
  const queryResult = apiClient(1).storyBoard.getOneStoryBoard.useQuery(
    [STORYBOARD_KEY.detail([storyBoardId])],
    {
      params: { storyBoardId: storyBoardId },
    },
  );
  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body.data,
  };
};

export default useGetStoryBoard;
