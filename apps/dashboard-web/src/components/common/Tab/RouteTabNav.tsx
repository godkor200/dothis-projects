'use client';

import { motion } from 'framer-motion';
import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import usePathNameList from '@/hooks/usePathNameList';
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
};

const RouteTabNav = <T extends ReadonlyArray<TabItem>>({
  tabList,
  baseRoute,
  tabKey,
}: TabNavProps<T>) => {
  const pathName = usePathNameList();

  const currentTab = pathName ? pathName[pathName.length - 1] : null;

  const searchParams = useSearchParams();

  return (
    <div className=" relative  flex gap-[50px]">
      <div className="bg-grey400 absolute bottom-0  h-1 w-full " />
      {tabList.map((item) => (
        <Link href={`${baseRoute}/${item.link}` as Route} key={item.link}>
          <button
            key={item.link}
            className={cn('min-w-[100px]  pb-2 text-center font-bold relative')}
            // style={{
            //   WebkitTapHighlightColor: 'transparent',
            // }}
          >
            {item.title}

            {item.link === currentTab && (
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

export default RouteTabNav;
