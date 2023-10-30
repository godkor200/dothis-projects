import dayjs from 'dayjs';

import { apiInstance } from '@/utils/api/apiInstance';
import { apiServer } from '@/utils/api/apiServer';

const relatedContentApi: { [key: string]: any } = {
  /**
   *@description 유튜브 관련 API
   */
  youtube: (keyword: string) => {},

  /**
   *
   * @description 커뮤니티 관련 API
   */
  community: (keyword: string) => {},
  /**
   *
   * @description SNS 관련 API
   */
  SNS: (keyword: string) => {},
  /**
   * @description 뉴스 API
   */
  news: async (keyword: string) => {
    const obj = {
      access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      argument: {
        query: keyword,
        published_at: {
          from: '2023-09-01',
          until: '2023-09-26',
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
    const newsData = await fetch(
      'https://tools.kinds.or.kr/search/news?access_key=eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      { method: 'POST', body: JSON.stringify(obj) },
    );
    const { return_object } = await newsData.json();

    const returnData = await return_object.documents.map((item: any) => {
      return {
        title: item.title,
        category: item.category[0],
        provider: item.provider,
        date: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
        image: item.images,
        link: item.provider_link_page,
      };
    });
    return returnData;
  },
};

export default relatedContentApi;
