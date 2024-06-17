import { apiClient } from '@/utils/api/apiClient';

const useGetWeeklyTrendKeyword = () => {
  const queryResult = apiClient(1).hits.getKeywordThisWeekly.useQuery(
    ['test'],
    {
      query: {
        limit: '5',
      },
    },
  );

  return { ...queryResult, data: queryResult.data?.body.data };
};

export default useGetWeeklyTrendKeyword;
