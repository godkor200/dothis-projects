import type { apiRouter } from '@dothis/dto';
import type { UseInfiniteQueryOptions } from '@ts-rest/react-query';

import type { TrendingQuery } from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import { WEEKLY_KEYWORD_KEY } from '@/constants/querykey';
import type { SortingQuery } from '@/types/common';
import { apiClient } from '@/utils/api/apiClient';

import type { Weekly_Sort_Key } from './useGetTrendingKeywords';

interface PaginationQuery {
  limit?: number;
  page?: number;
}

const useGetWeeklyKeyword = (
  {
    startDate,
    keywordList,
    selectOptions,
    sort,
    order,
    limit,
    page,
  }: Partial<SortingQuery<Weekly_Sort_Key>> &
    Partial<TrendingQuery> &
    PaginationQuery,
  queryOptions?: UseInfiniteQueryOptions<
    typeof apiRouter.hits.getWeeklyKeywordSome
  >,
) => {
  const date = startDate?.format('YYYY-MM-DD');

  const queryResult = apiClient(1).hits.getWeeklyKeywordSome.useInfiniteQuery(
    WEEKLY_KEYWORD_KEY.list([
      {
        date,
        keywordList,
        selectOptions,
        sort,
        order,
      },
    ]),
    ({ pageParam = 1 }) => {
      return {
        query: {
          limit: limit ? String(limit) : String(30),
          from: '2024-05-06',
          keywords: keywordList?.join(','),
          categoryNumbers: selectOptions?.map((item) => item.value).join(','),
          sort: sort,
          page: String(pageParam),
          order: order,
        },
      };
    },
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.body.data.data.length < 30
          ? undefined
          : allPages.length + 1;
      },
    },
  );

  return {
    ...queryResult,
    data: queryResult.data?.pages.flatMap((item) => item.body.data.data),
    total: queryResult.data?.pages[0].body.data.total,
  };
};

export default useGetWeeklyKeyword;
