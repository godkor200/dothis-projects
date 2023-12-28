import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import { KEYWORD_KEY, USER_KEY } from '@/constants/querykey';
import useSearchInput from '@/hooks/useSearchInput';
import { apiClient } from '@/utils/api/apiClient';

import useGetUserInfo from '../query/useGetUserInfo';

// 상수 타입을 생성해서 'DELETE','ADD'이런식으로 분리해서 코드 축약이 가능하지만, 일단 보류(ex axios POST GET PUT 과 같은 형태 생각중)

// 현재 mutate를 하는 response에 prev값과 next(mutate안에)값 결과 변화가 없어도 mutate를 실행한다. -> 최적화를 한다면 front단에서 mutate를 넣어주는 곳에서 prev와  next값을 비교 후 mutate가 일어나지 않게끔 할 수 있을 것 같다

// 현재 눈으로 확인할 때는 지연되는 현상이 없어서 추가하지않았지만, optimistic 업데이트도 추가할지 고민중입니다.

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
      queryClient.invalidateQueries(USER_KEY.all);
    },
  });

  const keywordMutationResult = apiClient(
    1,
  ).user.putUpdatePersonalTag.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(KEYWORD_KEY.all);
      queryClient.invalidateQueries(USER_KEY.all);
    },
  });

  return {
    ...mutationResult,
    mutate: (item: string) =>
      mutationResult.mutate({
        body: {
          searchWord: createSearchWord(
            data?.searchWord,
            data?.personalizationTag,
            item,
            keywordMutationResult,
          ),
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
      queryClient.invalidateQueries(USER_KEY.all);
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
      queryClient.invalidateQueries(USER_KEY.all);
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
      queryClient.invalidateQueries(USER_KEY.all);
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
      queryClient.invalidateQueries(USER_KEY.all);
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
