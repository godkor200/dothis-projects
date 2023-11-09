import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import useSearchInput from '@/hooks/useSearchInput';
import { apiClient } from '@/utils/api/apiClient';

import useGetUserInfo from '../query/useGetUserInfo';

// 상수 타입을 생성해서 'DELETE','ADD'이런식으로 분리도 되겠지만. 일단 보류(ex axios POST GET PUT 과 같은 형태 생각중)

export const useCreateSearchwordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putSearchWord,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { createSearchWord } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putSearchWord.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          searchWord: createSearchWord(data?.searchWord, item),
        },
      }),
  };
};

export const useAddSearchwordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putSearchWord,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { addHashAndConvertToArray } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putSearchWord.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: { searchWord: addHashAndConvertToArray(data?.searchWord, item) },
      }),
  };
};

export const useRemoveSearchwordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putSearchWord,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { removeHashAndConvertToArray } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putSearchWord.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          searchWord: removeHashAndConvertToArray(data?.searchWord, item),
        },
      }),
  };
};

export const useDeleteSearchwordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putSearchWord,
    ClientArgs
  >,
) => {
  const { data } = useGetUserInfo();

  const { deleteKeywordAndConvertToArray } = useSearchInput();

  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putSearchWord.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          searchWord: deleteKeywordAndConvertToArray(data?.searchWord, item),
        },
      }),
  };
};

export const useResetSearchwordMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.user.putSearchWord,
    ClientArgs
  >,
) => {
  const queryClient = useQueryClient();

  const mutationResult = apiClient(1).user.putSearchWord.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  return {
    ...mutationResult,
    mutate: () =>
      mutationResult.mutate({
        body: {
          searchWord: [],
        },
      }),
  };
};
