import useRelWord from '@/hooks/user/useRelWord';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { apiClient } from '@/utils/apiClient';
import { convertKeywordsToArray } from '@/utils/keyword';

import useGetRelWords from './useGetRelWords';

const useGetDailyView = () => {
  const { data, isLoading: relWordIsLoading } = useGetRelWords();

  const selectedRelWord = useSelectedRelWord();

  const cluters = data?.cluster.slice(1, -1).split(',').map(String);

  // JSON.parse(cluster) 형식으로 오는데, 안쓴 이유 JSON.parse가 컴파일 단계에서 읽혀질 때  에러를 발생시킴

  const queryResults = apiClient(2).dailyViews.getDailyViews.useQueries({
    queries: [
      {
        queryKey: [
          'dailyView',
          data?.cluster.slice(1, -1).split(',')[0].trim()!,
          selectedRelWord,
        ],

        params: {
          clusterNumber: data?.cluster.slice(1, -1).split(',')[0].trim()!,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-10-11',
          to: '2023-10-17',
        },
        enabled: !relWordIsLoading && !!selectedRelWord,
      },
      {
        queryKey: [
          'dailyView',
          data?.cluster.slice(1, -1).split(',')[1].trim()!,
          selectedRelWord,
        ],

        params: {
          clusterNumber: data?.cluster.slice(1, -1).split(',')[1].trim()!,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-10-11',
          to: '2023-10-17',
        },
        enabled: !relWordIsLoading && !!selectedRelWord,
      },
      {
        queryKey: [
          'dailyView',
          data?.cluster.slice(1, -1).split(',')[2].trim()!,
          selectedRelWord,
        ],

        params: {
          clusterNumber: data?.cluster.slice(1, -1).split(',')[2].trim()!,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-10-11',
          to: '2023-10-17',
        },
        enabled: !relWordIsLoading && !!selectedRelWord,
      },
      {
        queryKey: [
          'dailyView',
          data?.cluster.slice(1, -1).split(',')[3].trim()!,
          selectedRelWord,
        ],

        params: {
          clusterNumber: data?.cluster.slice(1, -1).split(',')[3].trim()!,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-10-11',
          to: '2023-10-17',
        },
        enabled: !relWordIsLoading && !!selectedRelWord,
      },
      {
        queryKey: [
          'dailyView',
          data?.cluster.slice(1, -1).split(',')[4].trim()!,
          selectedRelWord,
        ],

        params: {
          clusterNumber: data?.cluster.slice(1, -1).split(',')[4].trim()!,
        },
        query: {
          keyword: data?.keyword!,
          relationKeyword: selectedRelWord!,
          from: '2023-10-11',
          to: '2023-10-17',
        },
        enabled: !relWordIsLoading && !!selectedRelWord,
      },
    ],
  });

  const [cluster1, cluster2, cluster3, cluster4, cluster5] = queryResults;

  const isLoading =
    cluster1.isLoading ||
    cluster2.isLoading ||
    cluster3.isLoading ||
    cluster4.isLoading ||
    cluster5.isLoading;

  // !isLoading && console.log(queryResults.map((item) => item.data?.body.data));

  // 현재 해당 data에서 가져온 cluster자체를 map돌리려니, enabled가 있어도 undefined가 추론이 되어서 에러가 발생. (실제로 코드가 읽히는 시점이 enbled와는 별개로 동작한다고 예상)

  // queries: data?.cluster
  // .slice(1, -1)
  // .split(',')
  // ?.map((clusterNumber, index) => {
  //   return {
  //     queryKey: ['dailyView', index],
  //     params: { clusterNumber: clusterNumber },
  //     query: {
  //       keyword: data?.keyword!,
  //       relationKeyword: selectedRelWord!,
  //       from: '2023-10-11',
  //       to: '2023-10-17',
  //     },
  //     enabled: !isLoading && !!data?.cluster,
  //   };
  // })!,

  return {
    isLoading,
    data: queryResults.map((item) => item.data?.body.data),
  };
};

export default useGetDailyView;
