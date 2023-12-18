import { VIDEODATA_KEY } from '@/constants/querykey';
import useKeyword from '@/hooks/user/useKeyword';
import { useSelectedWord } from '@/store/selectedWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoData = () => {
  const { data } = useGetRelWords();

  const { hashKeywordList } = useKeyword();
  const seletedWord = useSelectedWord();
  let clusters: string[] = [];

  if (data && data.cluster) {
    clusters = JSON.parse(data.cluster);
  }

  const queryResults = apiClient(1).video.getVideo.useQueries({
    queries: clusters.map((clusterNumber) => {
      return {
        queryKey: VIDEODATA_KEY.list([
          {
            clusterNumber,
            relword: seletedWord.relword,
            keyword: seletedWord.keyword,
          },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          // last:0,
          limit: 5,
          related: seletedWord.relword!,
          search: seletedWord.keyword!,
        },
        enabled: !!data && !!seletedWord.relword,
      };
    }),
  });

  const isLoading = queryResults.some((result) => result.isLoading);

  return {
    isLoading,
    data: queryResults.map((result) => result.data?.body.data),
  };
};

export default useGetVideoData;
