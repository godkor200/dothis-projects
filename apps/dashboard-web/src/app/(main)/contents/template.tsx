'use client';

import { getCookie, setCookie } from 'cookies-next';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import type { ChangeEvent } from 'react';
import { type PropsWithChildren, useEffect } from 'react';

import KeywordSearchResult from '@/components/MainContents/KeywordSearch/KeywordSearchResult';
import KeywordSlide from '@/components/MainContents/KeywordSearch/KeywordSlide';
import SearchBar from '@/components/MainContents/KeywordSearch/SearchBar';
import { GUEST_KEYWORD } from '@/constants/guestKeyword';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useRandomIndexActions } from '@/store/randomIndexStore';

const MainContentTemplate = ({ children }: PropsWithChildren) => {
  const { data } = useGetUserInfo();

  useEffect(() => {
    setCookie('random', Math.floor(Math.random() * 3));
  }, []);

  const { setRandomIndex } = useRandomIndexActions();

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * GUEST_KEYWORD.length));
  }, []);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onSelect = () => {
    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams!.entries())); // -> has to use this form

    // update as necessary

    current.set('guestKeyword', 'my');

    // cast to string
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : '';

    router.replace(`${pathname}${query}` as Route);
  };

  // 새로고침 trigger
  useEffect(() => {
    router.replace('/contents');
  }, [router]);

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
