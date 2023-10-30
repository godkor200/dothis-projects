'use client';

import { useState } from 'react';

import ArticleList from './ArticleList';
import { CurrentArticleProps } from './CurrentArticle';
import CurrentArticle from './CurrentArticle';

interface MainContentContainerProps {
  articleListData: CurrentArticleProps[];
}

const MediaArticlesContainer = ({
  articleListData,
}: MainContentContainerProps) => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };
  return (
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
  );
};

export default MediaArticlesContainer;
