import { WEEKLY_TREND_KEYWORD_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetWeeklyTrendKeyword = () => {
  const queryResult = apiClient(1).hits.getKeywordThisWeekly.useQuery(
    WEEKLY_TREND_KEYWORD_KEY.all,
    {
      query: {
        limit: '5',
      },
    },
  );

  return { ...queryResult, data: queryResult.data?.body.data };
};

export default useGetWeeklyTrendKeyword;
