'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import type {
  CATEGORY_TABNAV_DATA,
  MEDIA_TABNAV_DATA,
  MYPAGE_TABNAV_DATA,
} from '@/constants/TabNav';
import { cn } from '@/utils/cn';

interface MediaArticlesTabNavProps<
  T extends
    | typeof MEDIA_TABNAV_DATA
    | typeof MYPAGE_TABNAV_DATA
    | typeof CATEGORY_TABNAV_DATA,
> {
  tabKey: string;
  tabNavData: T;
  selectedArticle: T[number]['category'];
}

const TabNavigation = <
  T extends
    | typeof MEDIA_TABNAV_DATA
    | typeof MYPAGE_TABNAV_DATA
    | typeof CATEGORY_TABNAV_DATA,
>({
  tabKey,
  tabNavData,
  selectedArticle,
}: MediaArticlesTabNavProps<T>) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
  return (
    <header
      id={tabKey}
      className="border-grey400 bg-grey00 text-grey400 flex gap-[0.75rem] border-b border-solid pb-[30px]"
    >
      {tabNavData.map((item, index) => (
        <div key={index} className=" flex gap-[0.75rem]">
          <Link
            key={index}
            href={
              (pathName +
                '?' +
                createQueryString(tabKey, item.category) +
                `#${tabKey}`) as Route
            }
            replace
            className={cn('cursor-pointer text-[32px] font-bold', {
              'text-grey700': selectedArticle === item.category,
            })}
          >
            {item.title}
          </Link>
          {index !== tabNavData.length - 1 && (
            <p className="text-[32px] font-bold">/</p>
          )}
        </div>
      ))}
    </header>
  );
};

export default TabNavigation;
