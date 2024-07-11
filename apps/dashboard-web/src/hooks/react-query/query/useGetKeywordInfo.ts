import { KEYWORD_INFORMATION_KEY } from '@/constants/querykey';
import { apiClient } from '@/utils/api/apiClient';

const useGetKeywordInfo = ({ searchKeyword }: { searchKeyword: string }) => {
  const queryResult = apiClient(1).relatedWords.getKeywordInformation.useQuery(
    KEYWORD_INFORMATION_KEY.detail([searchKeyword]),
    {
      params: {
        search: searchKeyword,
      },
    },
    {
      enabled: !!searchKeyword,
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.body.data,
  };
};

export default useGetKeywordInfo;
