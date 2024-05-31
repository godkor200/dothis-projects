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

const useGetTrendingKeywords = (
  {
    startDate,
    keywordList,
    selectOptions,
    sort,
    order,
    lastIndex_ID,
  }: SortingQuery<Weekly_Sort_Key> & TrendingQuery & { lastIndex_ID?: string },
  queryOptions?: UseInfiniteQueryOptions<
    typeof apiRouter.hits.getWeeklyKeywordListWithPaging
  >,
) => {
  const date = startDate.format('YYYY-MM-DD');

  const isSignedIn = useIsSignedIn();
  const queryResults = apiClient(
    1,
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
    ({ pageParam = 0 }) => ({
      query: {
        limit: isSignedIn ? String(lastIndex_ID ? 30 : 300) : String(10),
        from: date,
        last: lastIndex_ID,
        order: order,
        sort: sort === 'rank' ? 'keyword' : sort,
      },
    }),
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        // return lastPage.body.data.length < 10 || allPages.length > 4
        //   ? false
        //   : true;
        return true;
      },
    },
  );

  const requiredQueryResult = queryResults.data as DeepRequired<
    typeof queryResults.data
  >;

  return {
    ...queryResults,
    data: requiredQueryResult?.pages.flatMap((item) => item.body.data.data),
    total: requiredQueryResult?.pages[0].body.data.total,
  };
};

export default useGetTrendingKeywords;
