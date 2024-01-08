import { VIDEODATA_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetVideoInformation = (
  videoId: string | undefined,
  cluster: number | undefined,
) => {
  const queryResult = apiClient(1).video.getIndividualVideo.useQuery(
    VIDEODATA_KEY.detail([
      {
        id: videoId,
      },
    ]),
    {
      params: {
        clusterNumber: String(cluster),
        videoId: videoId!,
      },
    },
    {
      enabled: !!videoId && !!cluster,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetVideoInformation;
