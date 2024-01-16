import type { apiRouter } from '@dothis/dto/src/lib/apiRouter';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';

import type { SortingQuery } from '@/app/(main)/(searchGNB)/trending/page';
import type { TrendingQuery } from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import { TRENDING_KEYWORD_KEY } from '@/constants/querykey';
import { useIsSignedIn } from '@/store/authStore';
import { apiClient } from '@/utils/api/apiClient';

export const videoKeys = {
  video: ['video'],
};

const useGetTrendingKeywords = (
  {
    startDate,
    keywordList,
    selectOptions,
    sort,
    order,
    lastIndex_ID,
  }: SortingQuery & TrendingQuery & { lastIndex_ID?: string },
  queryOptions?: UseInfiniteQueryOptions<
    typeof apiRouter.weeklyViews.getWeeklyKeywordListWithPaging
  >,
) => {
  const date = startDate.format('YYYY-MM-DD');

  const isSignedIn = useIsSignedIn();
  const queryResults = apiClient(
    1,
  ).weeklyViews.getWeeklyKeywordListWithPaging.useInfiniteQuery(
    TRENDING_KEYWORD_KEY.list([
      {
        date: date,
        limit: isSignedIn ? 300 : 10,
        lastIndex_ID,
        sort,
        order,
      },
    ]),

    /**
     * 저희는 pageParam의 대한 정보를 api 요청할 때 보내고 있지는않아서
     */
    ({ pageParam = 0 }) => ({
      query: {
        limit: isSignedIn ? 300 : 10,
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

  return {
    ...queryResults,
    data: queryResults.data?.pages.flatMap((item) => item.body.data.data),
    total: queryResults.data?.pages[0].body.data.total,
  };
};

export default useGetTrendingKeywords;
