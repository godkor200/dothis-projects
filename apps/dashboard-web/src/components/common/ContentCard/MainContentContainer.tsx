'use client';

import { useState } from 'react';

import type { ContentProps } from './Content';
import Content from './Content';
import ContentList from './ContentList';

interface MainContentContainer {
  contentArray: Array<ContentProps>;
}

const MainContentContainer = ({ contentArray }: MainContentContainer) => {
  const [contentIndex, setContentIndex] = useState(0);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };
  return (
    <>
      <Content
        title={contentArray[contentIndex].title}
        category={contentArray[contentIndex].category}
        provider={contentArray[contentIndex].provider}
        date={contentArray[contentIndex].date}
        image={contentArray[contentIndex].image}
        link={contentArray[contentIndex].link}
      />
      <ContentList
        contentArray={contentArray}
        handleSetContentIndex={handleSetContentIndex}
      />
    </>
  );
};

export default MainContentContainer;
