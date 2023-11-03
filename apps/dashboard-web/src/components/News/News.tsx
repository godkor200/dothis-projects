'use client';

import { useEffect } from 'react';

let obj = {
  access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
  argument: {
    query: '아시안게임',
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
    fields: ['byline', 'category', 'category_incident', 'provider_news_id'],
  },
};
const News = () => {
  useEffect(() => {
    async function aa() {
      const test = await fetch(
        'https://tools.kinds.or.kr/search/news?access_key=eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
        { method: 'POST', body: JSON.stringify(obj) },
      );
      const dd = await test.json();
    }
    aa();
  }, []);
  return <></>;
};

export default News;
