'use client';

import { divide } from 'lodash';
import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/utils/cn';

export type ArticleType = (typeof TabNavData)[number]['category'];

interface MediaArticlesTabNavProps {
  selectedArticle: ArticleType;
}

export const TabNavData = [
  { title: '내 정보', category: 'info' },
  { title: '내 이용권 관리', category: 'manage' },
  { title: 'FAQ', category: 'faq' },
] as const;

const MyPageTabNav = ({ selectedArticle }: MediaArticlesTabNavProps) => {
  return (
    <header
      id="media"
      className="border-grey400 bg-grey00 text-grey400 flex gap-[0.75rem] border-b border-solid pb-[30px]"
    >
      {TabNavData.map((item, index) => (
        <>
          <Link
            href={{
              pathname: 'mypage',
              query: { relatedContent: item.category },
            }}
            replace
            className={cn('cursor-pointer text-[32px] font-bold', {
              'text-grey700': selectedArticle === item.category,
            })}
          >
            {item.title}
          </Link>
          {index !== TabNavData.length - 1 && (
            <p className="text-[32px] font-bold">/</p>
          )}
        </>
      ))}
    </header>
  );
};

export default MyPageTabNav;
