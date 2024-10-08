'use client';

import { motion } from 'framer-motion';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import usePathNameList from '@/hooks/usePathNameList';
import useQueryString from '@/hooks/useQueryString';
import { cn } from '@/utils/cn';

interface TabItem {
  title: string;
  link: string;
}

// ReadonlyArray 타입을 받을 수 있는 제네릭 컴포넌트 Props 정의
type TabNavProps<T extends ReadonlyArray<TabItem>> = {
  tabList: T; // ReadonlyArray를 지원하는 제네릭 타입
  baseRoute: Route;
  tabKey: string;
  paramsKey: string;
};

const ParamsTabNav = <T extends ReadonlyArray<TabItem>>({
  tabList,
  baseRoute,
  tabKey,
  paramsKey,
}: TabNavProps<T>) => {
  const pathName = usePathNameList();

  const { createUrlWithQueryString } = useQueryString();

  const searchParams = useSearchParams();

  const currentTab = pathName ? pathName[pathName.length - 1] : null;

  const hasParams = searchParams?.has(paramsKey);
  const paramsValue = searchParams?.get(paramsKey);
  return (
    <div className="relative  flex gap-[50px] ">
      <div className="bg-grey400 absolute bottom-0  h-1 w-full " />
      {tabList.map((item, index, arr) => (
        <Link
          href={
            `${createUrlWithQueryString({
              name: paramsKey,
              value: item.link,
            })}` as Route
          }
          key={item.link}
          scroll={false}
        >
          <button
            key={item.link}
            className={cn('min-w-[100px]  pb-2 text-center font-bold relative')}
            // style={{
            //   WebkitTapHighlightColor: 'transparent',
            // }}
          >
            {item.title}

            {(item.link === paramsValue ||
              (!hasParams && item.link === arr[0].link)) && (
              <motion.span
                layoutId={tabKey}
                className="bg-primary500 z-9999 absolute bottom-0 left-0 h-1 w-full mix-blend-normal"
                // style={{ borderRadius: 9999 }}
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        </Link>
      ))}{' '}
    </div>
  );
};

export default ParamsTabNav;
