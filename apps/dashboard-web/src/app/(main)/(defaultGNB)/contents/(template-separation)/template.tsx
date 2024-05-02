'use client';

import { setCookie } from 'cookies-next';
import type { Route } from 'next';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { type PropsWithChildren, useEffect } from 'react';

import LoginLoadingComponent from '@/components/Auth/LoginLoading';
import KeywordSlide from '@/components/MainContents/KeywordSearch/KeywordSlide';
import TopBannerMediaList from '@/components/MainContents/MediaArticles/TopBannerMediaList';
import { GUEST_KEYWORD } from '@/constants/guest';
import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useKeyword from '@/hooks/user/useKeyword';
import { useModalActions } from '@/store/modalStore';
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

  const { hashKeywordList } = useKeyword();

  const { isLoading, isError } = useGetRankingWordList(hashKeywordList);

  // 새로고침 trigger (게스트 키워드를 랜덤으로 middleware에서 넣어주기위해 추가된 코드)
  useEffect(() => {
    // router.replace('/contents');
  }, [router]);

  const { setIsLoadingModalOpen, setModalContent } = useModalActions();

  useEffect(() => {
    if (isLoading) {
      setModalContent(<LoginLoadingComponent />);
      setIsLoadingModalOpen(true);
      return;
    }
    if (!isError) {
      setModalContent(null);
      setIsLoadingModalOpen(false);
    }
  }, [isLoading, isError]);

  return (
    <>
      <KeywordSlide />
      {/* <SearchBar /> */}
      {/* <KeywordSearchResult /> */}
      <TopBannerMediaList />

      <ul className=" mx-auto  flex w-[1342px] gap-[24px]  pl-[48px] text-[20px] font-bold">
        <li
          className={cn('  cursor-pointer text-grey500', {
            'border-primary500   border-b-4 border-solid text-grey700':
              mainTab !== 'all',
          })}
          onClick={() => router.push('?main=recommend')}
        >
          키워드 분석
        </li>
        <li
          className={cn('  cursor-pointer text-grey500', {
            'border-primary500   border-b-4 border-solid text-grey700':
              mainTab === 'all',
          })}
          // onClick={() => router.push('?main=all')}
        >
          연관 소재 비교
        </li>
      </ul>
      <div className="bg-grey100 pb-[200px] pt-[5rem]">{children}</div>
    </>
  );
};

export default MainContentTemplate;
