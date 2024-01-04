import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useState } from 'react';

import ParserContent from '@/components/common/ParserContent';
import useGetNewsArticle from '@/hooks/react-query/query/useGetNewsArticle';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import PaginationButtons from './PaginationButtons';
import SummaryCard from './SummaryCard';

const News = () => {
  /**
   * @state 페이지 네이션을 위한 pageIndex상태를 추가하였습니다
   * @useEffect 연관어 변경 및 페이지 변경에 따른 index가 0으로 초기화 해야할 것 같아서 useEffect로 초기화를 해주었습니다! (지금 useEffect로 컨트롤하는게 사이드 이펙트가 있지않을까? 고민이 있어서.. 개선점이 있다면 언제든 피드백 환영입니다!!)
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  const seletedWord = useSelectedWord();

  useEffect(() => {
    setPageIndex(0);
    setContentIndex(0);
  }, [seletedWord]);

  useEffect(() => {
    setContentIndex(0);
  }, [pageIndex]);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data } = useGetNewsArticle();

  const {
    data: scrollData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetNewsInfiniteQuery();
  console.log(scrollData);

  const onChange = useCallback(
    (isInview: boolean) => {
      if (isInview && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const dataObj = scrollData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  const returnData = useMemo(
    () =>
      dataObj?.map((item) => {
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

  /**
   * @mediaDataList returnData로 포맷팅을 변환한 Object[] -> 페이지네이션에 맞게끔 포맷팅을 변경합니다! (ex)[Array(5),Array(5),Array(5),Array(5),Array(5)]
   * @jsx 밑에 jsx는 mediaDataList를 이용해서 prop으로 전달하도록 수정하였습니다.
   * const mediaDataList = useMemo(() => {
    return returnData?.reduce(
      (
        result: (typeof returnData)[],
        item: (typeof returnData)[0],
        index: number,
      ) => {
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
   */

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
        <div className="flex-1">
          <ArticleList
            articleListData={returnData}
            handleSetContentIndex={handleSetContentIndex}
            onChange={onChange}
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
