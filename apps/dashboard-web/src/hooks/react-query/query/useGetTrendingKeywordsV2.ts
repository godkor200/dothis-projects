import type { apiRouter } from '@dothis/dto';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';
import type { DeepRequired } from 'react-hook-form';

import type { TrendingQuery } from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import { TRENDING_KEYWORD_KEY } from '@/constants/querykey';
import type { WEEKLY_SORT_OPTION } from '@/constants/weeklySortOption';
import { useIsSignedIn } from '@/store/authStore';
import type { SortingQuery } from '@/types/common';
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

export type Weekly_Sort_Key = (typeof WEEKLY_SORT_OPTION)[number]['key'];

type SnakeCase<T> = T extends `${infer A}${infer R}`
  ? Uppercase<A> extends A
    ? `_${Lowercase<A>}${SnakeCase<R>}`
    : `${A}${SnakeCase<R>}`
  : '';

type SnakeCaseKeys = {
  [K in Weekly_Sort_Key]: SnakeCase<K>;
};

const convertSortQuery: SnakeCaseKeys = {
  category: 'category',
  competitive: 'competitive',
  keyword: 'keyword',
  lastRanking: 'last_ranking',
  megaChannel: 'mega_channel',
  ranking: 'ranking',
  videoCount: 'video_count',
  weeklyViews: 'weekly_views',
};

const useGetTrendingKeywordsV2 = (
  {
    startDate,
    keywordList,
    selectOptions,
    sort,
    order,
  }: SortingQuery<Weekly_Sort_Key> & TrendingQuery,
  queryOptions?: UseInfiniteQueryOptions<
    typeof apiRouter.hits.getWeeklyKeywordListWithPagingV2
  >,
) => {
  const date = startDate.format('YYYY-MM-DD');

  const isSignedIn = useIsSignedIn();
  const queryResults = apiClient(
    1,
  ).hits.getWeeklyKeywordListWithPagingV2.useInfiniteQuery(
    TRENDING_KEYWORD_KEY.list([
      {
        date: date,
        isSignedIn,
        sort,
        order,
        keywords: keywordList.length ? keywordList.join(',') : undefined,
        category: selectOptions
          .map((item) => item.value.toString().padStart(2, '0'))
          .join(','),
      },
    ]),

    /**
     * 저희는 pageParam의 대한 정보를 api 요청할 때 보내고 있지는않아서
     */
    ({ pageParam = 0 }) => {
      return {
        query: {
          limit: isSignedIn ? String(30) : String(30),
          from: date,
          categoryNumbers: selectOptions
            .map((item) => item.value.toString().padStart(2, '0'))
            .join(','),
          keywords: keywordList.length ? keywordList.join(',') : undefined,
          order: order,
          sort: convertSortQuery[sort],
          page: pageParam + 1,
        },
      };
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        const dataCount = allPages.reduce((total, item) => {
          return total + item.body.body.limit * item.body.body.page;
        }, 0);

        const maxDataCount = lastPage.body.body.count;

        const hasNextPage = dataCount < maxDataCount;
        return hasNextPage ? allPages.length : false;
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

export default useGetTrendingKeywordsV2;
