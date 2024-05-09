'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { Route } from 'next';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useOpenFilterContext } from '@/app/(main)/(searchGNB)/trending/OpenFilterContext';
import { useTrendingQueryContext } from '@/app/(main)/(searchGNB)/trending/TrendingQueryContext';
import SvgComp from '@/components/common/SvgComp';
import SearchBar from '@/components/Trending/TrendingFilter/SearchBar';
import { GNB_MENUS } from '@/constants/SideMenus';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { useModalActions } from '@/store/modalStore';
import { cn } from '@/utils/cn';

import SignUpModal from '../Modal/ModalContent/SignUpModal';

// Header 반응형 디자인이나 기획이 나오면 반응형 대응 예정

const SearchGNB = () => {
  const { trendingQueryOption, setTrendingQueryOption } =
    useTrendingQueryContext('SearchGNB');

  const { openFilter, setOpenFilter } = useOpenFilterContext('SearchGNB');

  const pathName = usePathname();
  const isSignedIn = useIsSignedIn();
  const { setIsOpenSignUpModal } = useAuthActions();

  const { setIsModalOpen, setModalContent } = useModalActions();

  const router = useRouter();

  const checkIsSignedIn = () => {
    if (isSignedIn) return true;
    setIsOpenSignUpModal(true);
    // 기존에 contents로 보내고 searchParams를 추가해줘서 Modal이 무거운 느낌이 생겼던 것 같습니다.

    setModalContent(<SignUpModal />);
    setIsModalOpen(true);
    return false;
  };

  const handleRouter = (route: Route) => {
    if (route === '/pricing') {
      router.push(route);
      return;
    }
    if (route === '/about') {
      alert('개발중입니다.');
      return;
    }

    if (!checkIsSignedIn()) return;

    router.push(route);
  };

  const handleKeywordList = (keyword: string) => {
    setTrendingQueryOption((prev) =>
      prev.keywordList.indexOf(keyword) !== -1
        ? prev
        : { ...prev, keywordList: [...prev.keywordList, keyword] },
    );
  };

  return (
    <header className="border-grey300 relative  box-border  flex h-[5.5rem] w-full items-center border-b  border-solid p-5">
      {/* 이 부분은 Hover 디자인과 클릭 시 기능을 파악하고 추가 작업 */}

      <div className="desktop:gap-[0.75rem] absolute right-12 flex gap-[0.25rem]">
        {isSignedIn ? (
          GNB_MENUS.map((item, index) => (
            <div
              className={cn(
                'rounded-8 hover:bg-grey300 [&_path]:hover:stroke-grey600 p-3 cursor-pointer',
                {
                  '[&_path]:stroke-[#F0516D] bg-primary100':
                    pathName === item.link,
                },
              )}
              onClick={() => handleRouter(item.link as Route)}
              key={index}
            >
              <SvgComp icon={item.icon} size="1.5rem" />
            </div>
          ))
        ) : (
          <Link href={'/auth'}>
            <Button size="M" theme="contained">
              로그인
            </Button>
          </Link>
        )}
      </div>

      <div className="w-[680px]">
        <SearchBar setKeywordList={handleKeywordList} />
      </div>

      <div
        className={cn(
          'rounded-8 border-grey400 ml-[20px] flex h-[52px] w-[52px] items-center justify-center border cursor-pointer',
          { '[&_path]:stroke-[#F0516D] bg-primary100': openFilter },
        )}
        onClick={() => setOpenFilter((prev) => !prev)}
      >
        <SvgComp icon="Filter" size={22} />
      </div>
    </header>
  );
};
export default SearchGNB;
