import { VIDEODATA_KEY } from '@/constants/querykey';
import useKeyword from '@/hooks/user/useKeyword';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/api/apiClient';

import useGetRelWords from './useGetRelWords';

export const videoKeys = {
  video: ['video'],
};

const useGetVideoData = () => {
  const { data } = useGetRelWords();

  const { hashKeywordList } = useKeyword();
  const selectedRelWord = useSelectedRelWord();
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
            relword: selectedRelWord,
            keyword: hashKeywordList[0],
          },
        ]),
        params: {
          clusterNumber,
        },
        query: {
          // last:0,
          limit: 5,
          related: selectedRelWord!,
          search: hashKeywordList[0],
        },
        enabled: !!data && !!selectedRelWord,
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
