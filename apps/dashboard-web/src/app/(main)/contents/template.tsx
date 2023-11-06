'use client';

import type { PropsWithChildren } from 'react';

import KeywordSearchResult from '@/components/MainContents/KeywordSeacrh/KeywordSearchResult';
import KeywordSlide from '@/components/MainContents/KeywordSeacrh/KeywordSlide';
import SearchBar from '@/components/MainContents/KeywordSeacrh/SearchBar';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';

const MainContentTemplate = ({ children }: PropsWithChildren) => {
  const { data } = useGetUserInfo();

  return (
    <>
      <KeywordSlide keyword={data?.personalizationTag} />
      <SearchBar />
      <KeywordSearchResult />

      <div className="bg-grey100 pt-[5rem]">{children}</div>
    </>
  );
};

export default MainContentTemplate;
