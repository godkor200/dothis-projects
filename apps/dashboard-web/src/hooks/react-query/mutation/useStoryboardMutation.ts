import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import { STORYBOARD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

export const useCreateStoryBoardMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.storyBoard.createStoryBoard,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).storyBoard.createStoryBoard.useMutation({
    ...mutationOptions,
    onSuccess: (res) => {
      console.log(res.body);
      queryClient.invalidateQueries(STORYBOARD_KEY.lists());
    },
  });

  return {
    ...mutationResult,
  };
};
