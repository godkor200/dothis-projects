import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import ParserContent from '@/components/common/ParserContent';
import useKeyword from '@/hooks/user/useKeyword';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import SummaryCard from './SummaryCard';

const News = () => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { hashKeywordList } = useKeyword();

  const selectedRelWord = useSelectedRelWord();

  const retrievePosts = async () => {
    const obj = {
      access_key: 'eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      argument: {
        query: selectedRelWord,

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

    const response = await fetch(
      'https://tools.kinds.or.kr/search/news?access_key=eb75ee2e-b1f6-4ada-a964-9bf94c5a2f26',
      { method: 'POST', body: JSON.stringify(obj) },
    );

    const data = await response.json();
    return data;
  };

  const { data: original, isLoading } = useQuery(
    ['뉴스', selectedRelWord],
    retrievePosts,
    {
      enabled: !!hashKeywordList[0] && !!selectedRelWord,
    },
  );

  const returnData = useMemo(
    () =>
      original?.return_object?.documents?.map((item: any) => {
        return {
          title: item.title,
          category: item.category[0],
          provider: item.provider,
          date: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
          image: externaImageLoader(getMainImage(item.images)),
          link: item.provider_link_page,
          hilight: item.hilight,
        };
      }),
    [original],
  );

  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle.skeleton />
        <ArticleList.skeleton />
      </div>
    );
  }

  if (returnData.length === 0) {
    return (
      <div className="mt-10 flex flex-wrap gap-[1.25rem]">
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          해당 키워드에 대한 뉴스기사가 없습니다
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle
          title={returnData[contentIndex]?.title}
          category={returnData[contentIndex]?.category}
          provider={returnData[contentIndex]?.provider}
          date={returnData[contentIndex]?.date}
          image={returnData[contentIndex]?.image}
          link={returnData[contentIndex]?.link}
        />
        <ArticleList
          articleListData={returnData}
          handleSetContentIndex={handleSetContentIndex}
        />
      </div>
      <SummaryCard title="뉴스 요약">
        <ParserContent content={returnData[contentIndex]?.hilight} />
      </SummaryCard>
    </>
  );
};

export default News;
