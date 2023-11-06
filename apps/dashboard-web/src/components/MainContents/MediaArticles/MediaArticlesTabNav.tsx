'use client';

import Link from 'next/link';
import { useState } from 'react';

import { cn } from '@/utils/cn';

export type ArticleType = (typeof TabNavData)[number]['category'];

interface MediaArticlesTabNavProps {
  selectedArticle: ArticleType;
}

export const TabNavData = [
  { title: '유튜브', category: 'youtube' },
  // { title: '커뮤니티', category: 'community' },
  // { title: 'SNS', category: 'SNS' },
  { title: '뉴스', category: 'news' },
] as const;

const MediaArticlesTabNav = ({ selectedArticle }: MediaArticlesTabNavProps) => {
  const [articleTypes, setArticleTypes] =
    useState<ArticleType>(selectedArticle);

  const onClickSetArticleTypes = (type: ArticleType) => {
    setArticleTypes(type);
  };

  return (
    <header className="border-grey400 bg-grey00 text-grey400 flex gap-[0.75rem] border-b border-solid pb-[30px]">
      {TabNavData.map((item, index) => (
        <>
          <Link
            href={{
              pathname: '/contents',
              query: { relatedContent: item.category },
            }}
            onClick={() => onClickSetArticleTypes(item.category)}
            className={cn('cursor-pointer text-[32px] font-bold', {
              'text-grey700': articleTypes === item.category,
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

export default MediaArticlesTabNav;
