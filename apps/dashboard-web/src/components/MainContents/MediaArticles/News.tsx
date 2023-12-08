import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import ParserContent from '@/components/common/ParserContent';
import useGetNewsArticle from '@/hooks/react-query/query/useGetNewsArticle';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import SummaryCard from './SummaryCard';

const News = () => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data, isLoading } = useGetNewsArticle();

  const returnData = useMemo(
    () =>
      data?.return_object?.documents?.map((item: any) => {
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
    [data],
  );

  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle.skeleton />
        <ArticleList.skeleton />
      </div>
    );
  }

  if (returnData?.length === 0 || !returnData) {
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
