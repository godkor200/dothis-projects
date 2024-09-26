'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
};

const TabNav = <T extends ReadonlyArray<TabItem>>({
  tabList,
  baseRoute,
}: TabNavProps<T>) => {
  const pathName = usePathNameList();

  const currentTab = pathName ? pathName[pathName.length - 1] : null;

  return (
    <div className="border-grey400 flex  gap-[50px] border-b-4">
      {tabList.map((item) => (
        <Link href={`${baseRoute}/${item.link}` as Route} key={item.link}>
          <div
            className={cn(
              'mb-[-4px] w-[100px] border-b-4 border-grey400 pb-2 text-center font-bold',
              {
                'border-primary500': item.link === currentTab,
              },
            )}
          >
            {item.title}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TabNav;
