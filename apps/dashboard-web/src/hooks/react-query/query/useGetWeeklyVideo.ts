import { WEEKLY_TREND_VIDEO_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetWeeklyVideo = () => {
  const queryResult = apiClient(1).video.getIssueToday.useQuery(
    WEEKLY_TREND_VIDEO_KEY.all,
    {},
    {
      enabled: true,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetWeeklyVideo;
