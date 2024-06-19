'use client';

import useGetKeywordInfo from '@/hooks/react-query/query/useGetKeywordInfo';
import { cn } from '@/utils/cn';

const KeywordRank = ({ keyword }: { keyword: string }) => {
  const { data: keywordInfo } = useGetKeywordInfo({ searchKeyword: keyword });

  const isRankChanging =
    keywordInfo && keywordInfo?.ranking < keywordInfo?.lastRanking
      ? 'Up'
      : 'Down';

  const isRankStable =
    keywordInfo && keywordInfo.ranking === keywordInfo.lastRanking;

  return (
    <p
      className={cn('text-center text-[20px] font-bold', {
        'text-primary500': !isRankStable && isRankChanging === 'Up',
        'text-[#3183FF]': !isRankStable && isRankChanging === 'Down',
      })}
    >
      {keywordInfo ? (
        <span className="flex items-center justify-center">
          {keywordInfo.ranking?.toLocaleString('ko-kr')}
          {!isRankStable && isRankChanging === 'Up' && (
            <span className="flex items-center text-[16px]">
              {'('}
              {keywordInfo.lastRanking - keywordInfo.ranking}{' '}
              <span className="h-0 w-0 border-x-[4px] border-b-[8px]  border-x-transparent border-b-[#F00]"></span>
              {')'}
            </span>
          )}{' '}
          {!isRankStable && isRankChanging === 'Down' && (
            <span className="flex items-center text-[16px]">
              {'('}
              {keywordInfo.ranking - keywordInfo.lastRanking}{' '}
              <span className="h-0 w-0 border-x-[4px] border-t-[8px]  border-x-transparent border-t-[#3183FF]"></span>
              {')'}
            </span>
          )}
        </span>
      ) : (
        <span className="text-grey600">분석중</span>
      )}
    </p>
  );
};
export default KeywordRank;
