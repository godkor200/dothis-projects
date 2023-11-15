'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

import type { MediaTabNavData } from '@/app/(main)/contents/page';
import type { MyPageTabNavData } from '@/app/(main)/mypage/page';
import { cn } from '@/utils/cn';

interface MediaArticlesTabNavProps<
  T extends typeof MediaTabNavData | typeof MyPageTabNavData,
> {
  tabNavData: T;
  selectedArticle: T[number]['category'];
}

const TabNavigation = <
  T extends typeof MediaTabNavData | typeof MyPageTabNavData,
>({
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
      id="tab"
      className="border-grey400 bg-grey00 text-grey400 flex gap-[0.75rem] border-b border-solid pb-[30px]"
    >
      {tabNavData.map((item, index) => (
        <>
          <Link
            href={
              (pathName +
                '?' +
                createQueryString('tab', item.category) +
                '#tab') as Route
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
        </>
      ))}
    </header>
  );
};

export default TabNavigation;
