import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import { apiClient } from '@/utils/api/apiClient';

const useAutoCompleteWordScoreMutation = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.relatedWords.incrementScoreWords,
    ClientArgs
  >,
) => {
  const mutationResult = apiClient(
    2,
  ).relatedWords.incrementScoreWords.useMutation({
    ...mutationOptions,
    onSuccess: (data) => {},
  });

  return {
    ...mutationResult,
    mutate: (word: string) =>
      mutationResult.mutate({
        body: { word },
      }),
  };
};

export default useAutoCompleteWordScoreMutation;
