'use client';

import { useEffect, useState } from 'react';

import type { MedialTabNavDataCategoryType } from '@/constants/TabNav';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useGptOptionAction } from '@/store/gptOptionStore';

import News from './News';
import YouTube from './Youtube';

interface MediaArticlesContainerProps {
  // articleListData: CurrentArticleProps[];
  selectedArticle: MedialTabNavDataCategoryType;
}

const MediaArticlesContainer = ({
  selectedArticle,
}: MediaArticlesContainerProps) => {
  const [pageIndex, setPageIndex] = useState(4);

  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { setRelatedNews } = useGptOptionAction();

  const {
    data: scrollData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetNewsInfiniteQuery();

  useEffect(() => {
    if (!isLoading) {
      const relatedNewsData = scrollData?.pages[0].return_object.documents
        .filter((item, index) => index < 3)
        .map((item) => item.title);

      setRelatedNews((prev) => [...relatedNewsData!]);
      // scrollData?.pages[0].return_object.documents.map((item, index) => {
      //   if (index < 3) {
      //     setRelatedNews((prev) => [...prev, item.title]);
      //   }
      // });
    }
  }, [isLoading, JSON.stringify(scrollData)]);

  return (
    <>
      {selectedArticle === 'news' ? (
        <>
          <News />
        </>
      ) : selectedArticle === 'youtube' ? (
        <>
          <YouTube />
        </>
      ) : (
        <div className="mt-10 flex flex-wrap gap-[1.25rem]">
          <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
            서비스 준비중 입니다.
          </p>
        </div>
      )}
    </>
  );
};

export default MediaArticlesContainer;
