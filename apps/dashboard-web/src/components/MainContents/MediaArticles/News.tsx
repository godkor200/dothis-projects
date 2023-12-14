import dayjs from 'dayjs';
import { useEffect, useMemo, useState } from 'react';

import ParserContent from '@/components/common/ParserContent';
import useGetNewsArticle from '@/hooks/react-query/query/useGetNewsArticle';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import type { NewsData } from '@/types/news';
import { cn } from '@/utils/cn';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import PaginationButtons from './PaginationButtons';
import SummaryCard from './SummaryCard';

const News = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  const seletecRelWord = useSelectedRelWord();
  useEffect(() => {
    setPageIndex(0);
    setContentIndex(0);
  }, [seletecRelWord]);

  useEffect(() => {
    setContentIndex(0);
  }, [pageIndex]);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data, isLoading } = useGetNewsArticle();

  const returnData: NewsData[] | undefined = useMemo(
    () =>
      data?.return_object?.documents?.map((item) => {
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

  const mediaDataList = useMemo(() => {
    return returnData?.reduce(
      (result: NewsData[][], item: NewsData, index: number) => {
        const chunkIndex: number = Math.floor(index / 5);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }

        result[chunkIndex].push(item);
        return result;
      },
      [],
    );
  }, [data]);

  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle.skeleton />
        <ArticleList.skeleton />
      </div>
    );
  }

  if (returnData?.length === 0 || !returnData || !mediaDataList) {
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
          title={mediaDataList[pageIndex][contentIndex]?.title}
          category={mediaDataList[pageIndex][contentIndex]?.category}
          provider={mediaDataList[pageIndex][contentIndex]?.provider}
          date={mediaDataList[pageIndex][contentIndex]?.date}
          image={mediaDataList[pageIndex][contentIndex]?.image}
          link={mediaDataList[pageIndex][contentIndex]?.link}
        />
        <div>
          <ArticleList
            articleListData={mediaDataList[pageIndex]}
            handleSetContentIndex={handleSetContentIndex}
          />
          <PaginationButtons
            length={mediaDataList.length}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
      <SummaryCard title="뉴스 요약">
        <ParserContent content={returnData[contentIndex]?.hilight} />
      </SummaryCard>
    </>
  );
};

export default News;
