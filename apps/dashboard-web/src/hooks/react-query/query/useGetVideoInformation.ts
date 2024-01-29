import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseQueryOptions } from '@ts-rest/react-query';

import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

/**
 * videoId를 가지고 해당 video의 자세한 정보를 조회할 수 있는 hook입니다.
 * @param @videoId 조회할 videoId @clusterNumber video가 존재하는 cluster
 * @param queryOptions
 * @returns
 */
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
