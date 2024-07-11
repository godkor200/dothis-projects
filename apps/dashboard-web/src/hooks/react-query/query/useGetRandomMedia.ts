import type { UseInfiniteQueryOptions } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import type { NewsResponse, ServerResponse } from '@/types/news';
import {
  formatNewsFormMediaProps,
  formatYoutubeForMediaProps,
} from '@/utils/media/mediaFormat';

import useGetSingleNews from './useGetSingleNews';
import useGetSingleVideo from './useGetSingleVideo';
import useGetVideoData from './useGetVideoData';

// 랜덤 요소 생성 함수
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

export const useGetRandomMedia = ({
  mediaCategory,
  page,
  index,
  searchKeyword,
  relatedkeyword,
}: {
  mediaCategory: string;
  index: number;
} & PaginationQuery &
  KeywordQuery) => {
  const [fetchTime, setFetchTime] = useState<number | null>(null);

  const { data: youtubeData, isError: youtubeIsError } = useGetSingleVideo(
    {
      searchKeyword: searchKeyword,
      relatedkeyword: relatedkeyword,
      page,
      extraQueryKey: index,
    },
    {
      enabled: mediaCategory === 'youtube',
    },
  );

  const { data: newsData, isError: newsIsError } = useGetSingleNews(
    {
      searchKeyword: searchKeyword,
      relatedkeyword: relatedkeyword,
      page,
      queryKeyIndex: index,
    },
    {
      enabled: mediaCategory === 'news',
    },
  );

  useEffect(() => {
    if (youtubeData) {
      setFetchTime(new Date().getTime());
    }
    if (newsData) {
      setFetchTime(new Date().getTime());
    }
  }, [JSON.stringify(youtubeData), JSON.stringify(newsData)]);

  const mediaResult = useMemo(
    () =>
      mediaCategory === 'youtube'
        ? youtubeData && formatYoutubeForMediaProps(youtubeData)
        : newsData && formatNewsFormMediaProps(newsData),
    [youtubeData, newsData],
  );

  return {
    mediaResult,
    fetchTime,
    searchKeyword,
    relatedkeyword,
    mediaCategory,
  };
};

// 배열에 남은수만큼

/**
 * 랜덤요소에 따라서 케이스에 따른 fetch를 진행하고 싶지만, 현재 우리의 api 요청 플로우가 일반적이지 않아서 어려움이 있다
 */
export type ExtractFnReturnType<FnType extends (...args: any) => any> = Awaited<
  ReturnType<FnType>
>;

export type InfiniteQueryConfig<QueryFnType extends (...args: any) => any> =
  Omit<
    UseInfiniteQueryOptions<ExtractFnReturnType<QueryFnType>>,
    'queryKey' | 'queryFn'
  >;

const retrievePosts = async ({
  pageParam,
  keyword,
  startDate,
  endDate,
}: {
  pageParam: number;
  keyword: string;
  startDate: string;
  endDate: string;
}): Promise<NewsResponse> => {
  const obj = {
    access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
    argument: {
      query: { title: keyword || '먹방' },

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
      return_from: pageParam * 10,
      // 페이지네이션을 위해 25개로 수정하였습니다.
      return_size: 10,
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

  return response.data;
};

type QueryFnType = typeof retrievePosts;
const useGetNewsInfiniteQuery = (
  queryOptions?: InfiniteQueryConfig<QueryFnType>,
) => {
  // 조건에 따라 다른 useQuery 실행

  const { keyword = '아이돌', relword = '노래' } = useSelectedWord();

  const startDate = useStartDate();

  const endDate = useEndDate();

  return useInfiniteQuery<ExtractFnReturnType<QueryFnType>>(
    ['뉴스', keyword || '먹방', 1],
    ({ pageParam = 0 }) =>
      retrievePosts({
        pageParam: pageParam,
        keyword: keyword!,
        startDate,
        endDate,
      }),
    {
      ...queryOptions!,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.return_object.documents.length < 10 ||
          allPages.length > 4
          ? false
          : allPages.length;
      },
      select: (data) => {
        return {
          pageParams: data.pageParams,
          pages: data.pages.map((page) => {
            return {
              result: page.result,
              return_object: {
                total_hits: page.return_object.total_hits,
                documents: page.return_object.documents.filter(
                  (item) => item.images !== '',
                ),
              },
            };
          }),
        };
      },
      enabled: (queryOptions?.enabled ?? false) && !!startDate && !!endDate,
    },
  );
};

export default useGetNewsInfiniteQuery;
