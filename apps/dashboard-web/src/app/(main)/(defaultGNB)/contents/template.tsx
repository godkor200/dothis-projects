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
import { GUEST_KEYWORD } from '@/constants/guest';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useRandomIndexActions } from '@/store/randomIndexStore';
import { cn } from '@/utils/cn';

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

  const mainTab = searchParams?.get('main');

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

  // 새로고침 trigger (게스트 키워드를 랜덤으로 middleware에서 넣어주기위해 추가된 코드)
  useEffect(() => {
    // router.replace('/contents');
  }, [router]);

  return (
    <>
      <KeywordSlide />
      <SearchBar />
      <KeywordSearchResult />

      <ul className=" flex justify-center gap-[24px] text-[28px] font-bold">
        <li
          className={cn('  cursor-pointer text-grey500', {
            'border-primary500   border-b-4 border-solid text-grey700':
              mainTab !== 'all',
          })}
          onClick={() => router.push('?main=recommend')}
        >
          추천
        </li>
        <li
          className={cn('  cursor-pointer text-grey500', {
            'border-primary500   border-b-4 border-solid text-grey700':
              mainTab === 'all',
          })}
          onClick={() => router.push('?main=all')}
        >
          전체
        </li>
      </ul>
      <div className="bg-grey100 pb-[200px] pt-[5rem]">{children}</div>
    </>
  );
};

export default MainContentTemplate;
