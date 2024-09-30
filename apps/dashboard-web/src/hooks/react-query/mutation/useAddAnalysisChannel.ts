import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { ClientArgs } from '@ts-rest/core';
import type { UseMutationOptions } from '@ts-rest/react-query';

import { apiClient } from '@/utils/api/apiClient';

const useAddAnalysisChannel = (
  mutationOptions?: UseMutationOptions<
    typeof apiRouter.channel.registerChannelAnalysis,
    ClientArgs
  >,
) => {
  const mutationResult = apiClient(
    1,
  ).channel.registerChannelAnalysis.useMutation({ ...mutationOptions });

  return {
    ...mutationResult,
    mutate: (channelId: string) =>
      mutationResult.mutate({
        body: { registeredChannelId: channelId },
      }),
  };
};

export default useAddAnalysisChannel;
