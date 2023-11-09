import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import useSearchInput from '@/hooks/useSearchInput';
import { apiClient } from '@/utils/api/apiClient';

import useGetUserInfo from '../query/useGetUserInfo';

export const useAddKeywordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putUpdatePersonalTag,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { addHashAndConvertToArray } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putUpdatePersonalTag.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: { tag: addHashAndConvertToArray(data?.personalizationTag, item) },
      }),
  };

  // 근데 이런식으로 리턴하면 판별을 못함 이전과 같을 때 mutate 취소를 못함.
};

export const useRemoveKeywordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putUpdatePersonalTag,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { removeHashAndConvertToArray } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putUpdatePersonalTag.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          tag: removeHashAndConvertToArray(data?.personalizationTag, item),
        },
      }),
  };
};

export const useResetKeywordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putUpdatePersonalTag,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { resetKeyword } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putUpdatePersonalTag.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: () =>
      mutationResult.mutate({
        body: {
          tag: resetKeyword(data?.personalizationTag),
        },
      }),
  };
};
