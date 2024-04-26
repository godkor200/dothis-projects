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
    onSuccess: () => {
      queryClient.invalidateQueries(STORYBOARD_KEY.lists());
    },
  });

  return {
    ...mutationResult,
  };
};

interface UpdateStoryBoardProps {
  storyBoardId: string;
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.storyBoard.updateStoryBoardTitle,
    ClientArgs
  >;
}

export const useUpdateStoryBoardTitleMutation = ({
  storyBoardId,
  mutationOptions,
}: UpdateStoryBoardProps) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(
    1,
  ).storyBoard.updateStoryBoardTitle.useMutation({
    ...mutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(
        STORYBOARD_KEY.detail([{ id: storyBoardId }]),
      );
    },
  });

  return {
    ...mutationResult,
    mutate: (
      value: string, // TODO:
    ) =>
      mutationResult.mutate({
        params: { storyBoardId: storyBoardId },
        body: {
          value: value,
        },
      }),
  };
};

export const useUpdateStoryBoardOverviewMutation = (
  storyBoardId: string,
  description: string,
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.storyBoard.updateStoryBoard,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).storyBoard.updateStoryBoard.useMutation({
    ...mutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries(STORYBOARD_KEY.all);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        params: {
          storyBoardId,
        },
        body: {
          description,
        },
      }),
  };
};
