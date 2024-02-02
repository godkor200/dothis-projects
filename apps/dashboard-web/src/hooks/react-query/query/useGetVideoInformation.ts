import type { apiRouter } from '@dothis/dto';
import type { UseQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

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
  const requiredQueryResult = queryResult.data as DeepRequired<
    typeof queryResult.data
  >;

  return {
    ...queryResult,
    data: requiredQueryResult?.body.data,
  };
};

export default useGetVideoInformation;
