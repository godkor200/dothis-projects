'use client';

import { useState } from 'react';

import type { MedialTabNavDataCategoryType } from '@/constants/TabNav';

import type { CurrentArticleProps } from './CurrentArticle';
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
