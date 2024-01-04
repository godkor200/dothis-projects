import type {
  QueryOptions,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  UseQueryResult,
} from '@tanstack/react-query';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import type { NewsResponse, ServerResponse } from '@/types/news';

/**
 *
 * @param queryOptions
 * @returns queryOptions 타입에서 제네릭을 생략해서 사용하면 UseQueryResult에서라도 제네릭으로 return 타입을 지정해줘야한다.
 */
const useGetNewsInfiniteQuery = (
  queryOptions?: UseInfiniteQueryResult<NewsResponse>,
): UseInfiniteQueryResult<NewsResponse> => {
  const seletedWord = useSelectedWord();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const retrievePosts = async (pageParam: number): Promise<NewsResponse> => {
    console.log(pageParam);
    const obj = {
      access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      argument: {
        query: seletedWord.relword,

        published_at: {
          from: startDate,
          until: endDate,
        },
        // provider: ['경향신문'],
        // category: ['정치>정치일반', 'IT_과학'],
        // category_incident: ['범죄', '교통사고', '재해>자연재해'],
        // byline: '',

        sort: { date: 'desc' },
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

    const response = await axios.post(
      'https://tools.kinds.or.kr/search/news?access_key=eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      JSON.stringify(obj),
    );

    return response.data;
  };

  return useInfiniteQuery(
    ['뉴스', seletedWord.relword, 1],
    ({ pageParam = 0 }) => retrievePosts(pageParam),
    {
      ...queryOptions,
      getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage);
        console.log(allPages);

        return lastPage.return_object.documents.length < 10 ||
          allPages.length > 4
          ? false
          : allPages.length;
      },
      enabled: !!seletedWord.relword && !!startDate && !!endDate,
    },
  );
};

export default useGetNewsInfiniteQuery;
