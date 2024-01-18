import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetVideoInformation = (
  {
    videoId,
    clusterNumber,
  }: { videoId: string | undefined; clusterNumber: number | undefined },
  queryOptions?: UseQueryOptions<typeof apiRouter.video.getIndividualVideo>,
) => {
  const queryResult = apiClient(1).video.getIndividualVideo.useQuery(
    VIDEODATA_KEY.detail([
      {
        id: videoId,
      },
    ]),
    {
      params: {
        clusterNumber: String(clusterNumber),
        videoId: videoId!,
      },
    },
    {
      ...queryOptions,
      enabled: !!videoId && !!clusterNumber,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetVideoInformation;
