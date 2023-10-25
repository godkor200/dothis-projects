'use client';

import type { PropsWithChildren } from 'react';

import Header from '@/components/Chart/Header/Header';
import KeywordSlide from '@/components/Chart/Keyword/KeywordSlide';
import SearchBar from '@/components/Chart/SearchBar/Search';
import useGetUserInfo from '@/query/user/useGetUserInfo';

const ChartTemplate = ({ children }: PropsWithChildren) => {
  const { data } = useGetUserInfo();

  return (
    <>
      <KeywordSlide keyword={data?.personalizationTag} />
      <SearchBar />
      <Header />

      <div className="bg-grey100 pt-[5rem]">{children}</div>
    </>
  );
};

export default ChartTemplate;
