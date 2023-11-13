'use client';

import { getCookie, setCookie } from 'cookies-next';
import { type PropsWithChildren, useEffect } from 'react';

import KeywordSearchResult from '@/components/MainContents/KeywordSearch/KeywordSearchResult';
import KeywordSlide from '@/components/MainContents/KeywordSearch/KeywordSlide';
import SearchBar from '@/components/MainContents/KeywordSearch/SearchBar';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useRandomIndexActions } from '@/store/randomIndexStore';

const MainContentTemplate = ({ children }: PropsWithChildren) => {
  const { data } = useGetUserInfo();

  useEffect(() => {
    setCookie('random', Math.floor(Math.random() * 3));
  }, []);

  const { setRandomIndex } = useRandomIndexActions();

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * 3));
  }, []);
  return (
    <>
      <KeywordSlide />
      <SearchBar />
      <KeywordSearchResult />

      <div className="bg-grey100 pt-[5rem]">{children}</div>
    </>
  );
};

export default MainContentTemplate;
