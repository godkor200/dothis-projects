import { UPLOAD_VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

const useGetVideoUploadCount = ({
  keyword,
  relword,
}: {
  keyword: string | null;
  relword: string | null;
}) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResult = apiClient(2).video.getVideoCount.useQuery(
    UPLOAD_VIDEO_COUNT_KEY.list([{ keyword, relword, startDate, endDate }]),
    {
      query: {
        search: keyword!,
        related: relword!,
        from: startDate,
        to: endDate,
      },
    },
    {
      enabled: !!keyword && !!startDate && !!endDate,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetVideoUploadCount;
