import { UPLOAD_VIDEO_COUNT_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { apiClient } from '@/utils/api/apiClient';

const useVideoUploadCountQueries = ({
  baseKeyword,
  relatedKeywords,
}: {
  baseKeyword: string;
  relatedKeywords: string[];
}) => {
  const startDate = useStartDate();

  const endDate = useEndDate();

  const queryResults = apiClient(2).video.getVideoCount.useQueries({
    queries: relatedKeywords.map((relatedKeyword) => ({
      queryKey: UPLOAD_VIDEO_COUNT_KEY.list([
        { keyword: baseKeyword, relword: relatedKeyword, startDate, endDate },
      ]),

      query: {
        search: baseKeyword,
        related: relatedKeyword,
        from: startDate,
        to: endDate,
      },

      enabled: !!startDate && !!endDate && !!baseKeyword && !!relatedKeyword,
    })),
  });

  const flat = queryResults.flatMap((queryResult, index) => {
    return {
      data: queryResult.data?.body.data,
      keyword: relatedKeywords[index],
    };
  });

  return {
    ...queryResults,
    data: flat,
  };
};

export default useVideoUploadCountQueries;
