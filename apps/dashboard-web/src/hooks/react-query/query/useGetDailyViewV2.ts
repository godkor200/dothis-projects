import { DAILYVIEW_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

const useGetDailyViewV2 = ({
  keyword,
  relword,
}: {
  keyword: string;
  relword: string | null;
}) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResult = apiClient(2).hits.getDailyViewsV2.useQuery(
    DAILYVIEW_KEY.list([keyword, relword]),
    {
      query: {
        from: startDate,
        to: endDate,
        search: keyword,
        related: relword ? relword : keyword,
      },
    },
    {
      enabled: !!startDate && !!endDate && !!keyword,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetDailyViewV2;
