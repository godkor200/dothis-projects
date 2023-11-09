import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import useSearchInput from '@/hooks/useSearchInput';
import { apiClient } from '@/utils/api/apiClient';

import useGetUserInfo from '../query/useGetUserInfo';

// 상수 타입을 생성해서 'DELETE','ADD'이런식으로 분리해서 코드 축약이 가능하지만, 일단 보류(ex axios POST GET PUT 과 같은 형태 생각중)

// 현재 mutate를 하는 response에 prev값과 next(mutate안에)값 결과 변화가 없어도 mutate를 실행한다. -> 최적화를 한다면 front단에서 mutate를 넣어주는 곳에서 prev와  next값을 비교 후 mutate가 일어나지 않게끔 할 수 있을 것 같다

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
