import type { apiRouter } from '@dothis/dto';
import { useQueryClient } from '@tanstack/react-query';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import type { SortingQuery } from '@/app/(main)/(searchGNB)/trending/page';
import {
  type TrendingQuery,
  useTrendingQueryContext,
} from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import { TRENDING_KEYWORD_KEY } from '@/constants/querykey';
import { useIsSignedIn } from '@/store/authStore';
import { apiClient } from '@/utils/api/apiClient';

export const videoKeys = {
  video: ['video'],
};

/**
 * 해당 query는 수집한 키워드 및 연관어에 대한 정보 한눈에 쉽게 볼 수 있도록 순위별로 가져올 수 있는 hook입니다
 * @param param 필터 및 정렬의 필요한 data들의 object파라미터입니다.
 * @param queryOptions
 * @returns
 */
const useGetTrendingKeywords = (
  {
    startDate,
    keywordList,
    categoryList,
    sort,
    order,
  }: SortingQuery & TrendingQuery,
  queryOptions?: UseInfiniteQueryOptions<
    typeof apiRouter.hits.getWeeklyKeywordListWithPaging
  >,
) => {
  let date = startDate.format('YYYY-MM-DD');

  const queryClient = useQueryClient();

  const {
    trendingQuery,
    trendingQueryActions: { setStartDate },
  } = useTrendingQueryContext('useGetTrendingKeywords');

  const isSignedIn = useIsSignedIn();
  const queryResults = apiClient(
    2,
  ).hits.getWeeklyKeywordListWithPaging.useInfiniteQuery(
    TRENDING_KEYWORD_KEY.list([
      {
        date: date,
        isSignedIn,
        sort,
        order,
      },
    ]),

    /**
     * 저희는 pageParam의 대한 정보를 api 요청할 때 보내고 있지는않아서
     */
    (query) => {
      return {
        query: {
          // pageParam이 boolean이면 첫페이지니깐 300
          limit: isSignedIn ? String(!query.pageParam ? 300 : 30) : String(10),
          // 첫페이지 limit가 300이여서 10개를 추가한 형태
          page: query.pageParam ? query.pageParam + 10 : 1,
          from: date,
          order: order,
          sort: sort === 'rank' ? 'keyword' : sort,
        },
      };
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.body.body?.count
          ? lastPage.body.body.count >
            allPages.flatMap((item) => item.body.body?.data).length
            ? allPages.length
            : false
          : false;
      },

      onError: (err) => {
        const hasData = queryClient.getQueryData(
          TRENDING_KEYWORD_KEY.list([
            {
              date: date,
              isSignedIn,
              sort,
              order,
            },
          ]),
        );

        if (
          !hasData &&
          !startDate.subtract(1, 'week').isBefore('2024-01-01', 'day')
        ) {
          setStartDate((prev) => prev.subtract(1, 'week'));
        } else {
          console.log('더 이상 데이터가 없다 정도');
        }
      },
    },
  );

  const requiredQueryResult = queryResults.data as DeepRequired<
    typeof queryResults.data
  >;

  return {
    ...queryResults,
    data: requiredQueryResult?.pages.flatMap((item) => item.body.body.data),
    total: requiredQueryResult?.pages[0].body.body.count,
  };
};

export default useGetTrendingKeywords;
