import { apiClient } from '@/utils/api/apiClient';
import { combinedKeywordsAndTags } from '@/utils/keyword';

const useGetKeywordArray = () => {
  const { data: keywordArr, isLoading: keywordLoading } = apiClient(
    2,
  ).user.getUserKeyword.useQuery(['keyword']);

  return combinedKeywordsAndTags(
    keywordArr?.body.data.channel_tags,
    keywordArr?.body.data.channel_keywords,
  );
};

export default useGetKeywordArray;
