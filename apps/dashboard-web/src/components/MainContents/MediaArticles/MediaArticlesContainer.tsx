'use client';

import { useState } from 'react';

import ArticleList from './ArticleList';
import type { CurrentArticleProps } from './CurrentArticle';
import CurrentArticle from './CurrentArticle';
import type { ArticleType } from './MediaArticlesTabNav';

interface MainContentContainerProps {
  articleListData: CurrentArticleProps[];
  selectedArticle: ArticleType;
}

const MediaArticlesContainer = ({
  articleListData,
  selectedArticle,
}: MainContentContainerProps) => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  return (
    <div className="mt-10 flex gap-[1.25rem]">
      {selectedArticle === 'news' ? (
        <>
          <CurrentArticle
            title={articleListData[contentIndex].title}
            category={articleListData[contentIndex].category}
            provider={articleListData[contentIndex].provider}
            date={articleListData[contentIndex].date}
            image={articleListData[contentIndex].image}
            link={articleListData[contentIndex].link}
          />
          <ArticleList
            articleListData={articleListData}
            handleSetContentIndex={handleSetContentIndex}
          />
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
