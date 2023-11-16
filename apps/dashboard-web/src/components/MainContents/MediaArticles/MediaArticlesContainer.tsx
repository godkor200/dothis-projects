'use client';

import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';

import type { MedialTabNavDataCategoryType } from '@/constants/TabNav';
import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import {
  externaImageLoader,
  externalYouTubeImageLoader,
  getMainImage,
} from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import type { CurrentArticleProps } from './CurrentArticle';
import CurrentArticle from './CurrentArticle';
import News from './News';
import YouTube from './Youtube';

interface MainContentContainerProps {
  articleListData: CurrentArticleProps[];
  selectedArticle: MedialTabNavDataCategoryType;
}

const MediaArticlesContainer = ({
  articleListData,
  selectedArticle,
}: MainContentContainerProps) => {
  const [pageIndex, setPageIndex] = useState(4);

  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  // hook rule에 위배되는 객체
  // const test = {
  //   youtube: () => {
  //     const { data } = useGetVideoData();
  //     console.log(data);

  //     return data[pageIndex]?.data?.map((item) => {
  //       return {
  //         title: item._source.video_title,
  //         category: item._source.video_category,
  //         image: externalYouTubeImageLoader(item._source.video_id),
  //         date: item._source.video_published,
  //         link: item._source.video_url,
  //         provider: item._source.video_category,
  //       };
  //     });
  //   },
  //   news: () => {
  //     const obj = {
  //       access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
  //       argument: {
  //         query: '아시안게임',
  //         //나중에 키워드 연동
  //         published_at: {
  //           from: '2023-09-01',
  //           until: '2023-09-26',
  //         },
  //         // provider: ['경향신문'],
  //         // category: ['정치>정치일반', 'IT_과학'],
  //         // category_incident: ['범죄', '교통사고', '재해>자연재해'],
  //         // byline: '',

  //         sort: { date: 'desc' },
  //         hilight: 200,
  //         return_from: 0,
  //         return_size: 5,
  //         fields: [
  //           'byline',
  //           'category',
  //           'category_incident',
  //           'provider_news_id',
  //           'images',
  //           'provider_link_page',
  //         ],
  //       },
  //     };

  //     const retrievePosts = async () => {
  //       const response = await fetch(
  //         'https://tools.kinds.or.kr/search/news?access_key=eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
  //         { method: 'POST', body: JSON.stringify(obj) },
  //       );

  //       const data = await response.json();
  //       return data;
  //     };

  //     const data = useQuery(['뉴스', '아시안게임'], retrievePosts);

  //     const returnData = data.data?.return_object?.documents?.map(
  //       (item: any) => {
  //         return {
  //           isLoading: data.isLoading,
  //           title: item.title,
  //           category: '정민',
  //           provider: item.provider,
  //           date: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
  //           image: externaImageLoader(getMainImage(item.images)),
  //           link: item.provider_link_page,
  //         };
  //       },
  //     );

  //     return returnData;
  //   },
  // };

  return (
    <div className="mt-10 flex gap-[1.25rem]">
      {selectedArticle === 'news' ? (
        <>
          {/* <CurrentArticle
            title={test[selectedArticle]()[contentIndex]?.title}
            category={test[selectedArticle]()[contentIndex]?.category}
            provider={test[selectedArticle]()[contentIndex]?.provider}
            date={test[selectedArticle]()[contentIndex]?.date}
            image={test[selectedArticle]()[contentIndex]?.image}
            link={test[selectedArticle]()[contentIndex]?.link}
          />
          <ArticleList
            articleListData={test[selectedArticle]()}
            handleSetContentIndex={handleSetContentIndex}
          /> */}
          <News />
        </>
      ) : selectedArticle === 'youtube' ? (
        <>
          {/* <CurrentArticle
            title={test[selectedArticle]()[contentIndex].title}
            category={test[selectedArticle]()[contentIndex].category}
            provider={test[selectedArticle]()[contentIndex].provider}
            date={test[selectedArticle]()[contentIndex].date}
            image={test[selectedArticle]()[contentIndex].image}
            link={test[selectedArticle]()[contentIndex].link}
          />
          <ArticleList
            articleListData={test[selectedArticle]()}
            handleSetContentIndex={handleSetContentIndex}
          /> */}
          <YouTube />
        </>
      ) : (
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          서비스 준비중 입니다.
        </p>
      )}
    </div>
  );
};

export default MediaArticlesContainer;
