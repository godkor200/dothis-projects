import type { QueryOptions, UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useEndDate, useStartDate } from '@/store/dateStore';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';

const useGetNewsArticle = (
  queryOptions?: QueryOptions,
): UseQueryResult<NewsResponse> => {
  const selectedRelWord = useSelectedRelWord();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const retrievePosts = async (): Promise<NewsResponse> => {
    const obj = {
      access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      argument: {
        query: selectedRelWord,

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
        return_from: 0,
        return_size: 5,
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

  return useQuery(['뉴스', selectedRelWord], () => retrievePosts(), {
    ...queryOptions,
    enabled: !!selectedRelWord && !!startDate && !!endDate,
  });
};

export default useGetNewsArticle;
