import type { QueryOptions } from '@tanstack/query-core';
import type { UseQueryOptions as RQUseQueryOptions } from '@tanstack/react-query';

export type UseQueryOptions<
  F extends (...args: any) => Promise<unknown>,
  S = Awaited<ReturnType<F>>,
> = Omit<RQUseQueryOptions<Awaited<ReturnType<F>>, any, S, any[]>, 'queryKey'>;

import {
  useQuery,
  useQueryClient,
  type UseQueryResult,
} from '@tanstack/react-query';
import axios from 'axios';

import { NEWS_DATA_KEY } from '@/constants/querykey';
import { useEndDate, useStartDate } from '@/store/dateStore';
import type { NewsResponse, ServerResponse } from '@/types/news';

interface PaginationQuery {
  limit?: number;
  page?: number;
}

interface DateQuery {
  from?: string;
  to?: string;
}

interface KeywordQuery {
  searchKeyword: string;
  relatedkeyword: string | null;
}

const retrievePosts = async ({
  keyword,
  relatedKeyword,
  startDate,
  endDate,
  page,
}: {
  keyword: string;
  relatedKeyword: string | null;
  startDate: string;
  endDate: string;
  page?: number;
}): Promise<NewsResponse> => {
  const obj = {
    access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
    argument: {
      query: {
        title: relatedKeyword ?? keyword,
        // relatedKeyword
        // ? `${keyword} AND ${relatedKeyword}`
        // : `${keyword}`,
      },

      published_at: {
        from: startDate,
        until: endDate,
      },
      // provider: ['경향신문'],
      category: ['정치', '경제', '사회', '국제', '지역', '스포츠', 'IT_과학'],
      // category_incident: ['범죄', '교통사고', '재해>자연재해'],
      // byline: '',

      sort: [
        { date: 'desc' },
        {
          _score: 'desc',
        },
      ],
      hilight: 200,
      return_from: page || 1,
      // 페이지네이션을 위해 25개로 수정하였습니다.
      return_size: 1,
      fields: [
        'byline',
        'category',
        'category_incident',
        'provider_news_id',
        'images',
        'provider_link_page',
      ],
    },
  };

  const response = await axios.post<NewsResponse>(
    'https://tools.kinds.or.kr/search/news?access_key=eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
    JSON.stringify(obj),
  );

  const news = response.data.return_object.documents;

  if (Array.isArray(news) && news.length === 0) {
    throw new Error('뉴스가 없습니다.');
  }

  return response.data;
};

type Test = {
  meta?: {
    fetchedAt: string;
  };
} & NewsResponse['return_object']['documents'][number];

const useGetSingleNews = <T extends any = ServerResponse<NewsResponse>>(
  {
    searchKeyword,
    relatedkeyword,
    from,
    to,
    limit,
    page,
    queryKeyIndex,
  }: KeywordQuery & PaginationQuery & DateQuery & { queryKeyIndex: number },
  queryOptions?: UseQueryOptions<
    typeof retrievePosts,
    NewsResponse['return_object']['documents'][number]
  >,
) => {
  const startDate = useStartDate();
  const endDate = useEndDate();

  const queryClient = useQueryClient();

  return useQuery(
    [
      NEWS_DATA_KEY.detail([
        {
          searchKeyword,
          relatedkeyword,
          from,
          to,
          limit,
          page,
          queryKeyIndex,
        },
      ]),
    ],

    () =>
      retrievePosts({
        keyword: searchKeyword,
        relatedKeyword: relatedkeyword,
        startDate,
        endDate,
        page,
      }),
    {
      ...queryOptions,
      enabled:
        (queryOptions?.enabled ?? false) &&
        !!searchKeyword &&
        !!startDate &&
        !!endDate,

      staleTime: Infinity,

      //   onSuccess(data) {
      //     // console.log(cachedData);
      //     console.log(queryClient);
      //     console.log(cachedData);
      //     if (cachedData) {
      //       queryOptions?.onSuccess?.(data);
      //     }
      //   },

      select: (data) => {
        return data.return_object.documents[0];
      },
    },
  );
};
export default useGetSingleNews;
