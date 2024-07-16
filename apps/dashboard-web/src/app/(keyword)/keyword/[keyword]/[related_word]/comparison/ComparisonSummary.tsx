'use client';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import type { TKeywords } from '@/types/common';
import { cn } from '@/utils/cn';

import { useSelectedKeywordContext } from './SelectedKeywordProvider';

const ComparisonSummary = ({ baseKeyword, relatedKeyword }: TKeywords) => {
  const selectSize = 3;

  const { data, isLoading, isError, refetch } =
    useGetRankingRelWords(baseKeyword);

  //   const relatedKeywordList = data?.slice(0, 10);
  const { relatedKeywordList, setRelatedKeywordList } =
    useSelectedKeywordContext('RelatedKeywordList');

  const sortedRelatedKeywordList = relatedKeywordList.sort((a, b) =>
    data ? data.indexOf(a) - data.indexOf(b) : 0,
  );
  const selectedListcolors = ['green', 'blue'];

  console.log(data?.find((keyword) => keyword === '가족'));

  return (
    <div className="border-grey200 grid  grid-rows-[56px_repeat(3,74px)] border-b-2">
      <div className="text-grey500 border-grey400 grid grid-cols-[40px_minmax(180px,1fr)_repeat(2,110px)_repeat(3,100px)_minmax(140px,1fr)] items-center gap-[10px] border-b-2 text-center text-[14px] font-[500]">
        <p>No.</p>
        <p>소재</p>
        <p>기대조회 수</p>
        <p>일일조회 수</p>
        <p>영상 수</p>
        <p>검색량 변화</p>
        <p>경쟁 강도</p>
        <p>구독자 10만 이상 채널</p>
      </div>

      {sortedRelatedKeywordList.map((item, index) => {
        const color =
          item === relatedKeyword ? 'red' : selectedListcolors.shift();

        return (
          <div
            className={cn(
              ' grid grid-cols-[40px_minmax(180px,1fr)_repeat(2,110px)_repeat(3,100px)_minmax(140px,1fr)] items-center gap-[10px] text-center text-[14px] text-grey900 font-[500]  border-b-2 border-grey200',
              {
                'bg-[#d2ffef]': color === 'green',
                'bg-[#d7dbfa]': color === 'blue',
                'bg-primary100': color === 'red',
                'border-0': index === selectSize - 1,
              },
            )}
          >
            <p>
              {data?.indexOf(item) !== -1
                ? data?.indexOf(item)
                  ? data?.indexOf(item) + 1
                  : 1
                : '-'}
            </p>
            <p>{item}</p>
          </div>
        );
      })}

      {sortedRelatedKeywordList.length < selectSize && (
        <div
          className={cn(
            'text-grey900 border-grey200  grid items-center border-b-2 pl-[50px] text-[14px] font-[500]',
            {
              'border-0': sortedRelatedKeywordList.length > selectSize - 2,
            },
          )}
        >
          키워드를 선택해주세요
        </div>
      )}
    </div>
  );
};

export default ComparisonSummary;
