'use client';

import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import { cn } from '@/utils/cn';

import { useSelectedKeywordContext } from './SelectedKeywordProvider';
const RelatedKeywordList = ({
  baseKeyword,
  relatedKeyword,
}: {
  baseKeyword: string;
  relatedKeyword: string;
}) => {
  const { data, isLoading, isError, refetch } =
    useGetRankingRelWords(baseKeyword);

  //   const relatedKeywordList = data?.slice(0, 10);
  const { relatedKeywordList, setRelatedKeywordList } =
    useSelectedKeywordContext('RelatedKeywordList');

  const sortedRelatedKeywordList = relatedKeywordList.sort((a, b) =>
    data ? data.indexOf(a) - data.indexOf(b) : 0,
  );
  const selectedListcolors = ['green', 'blue'];

  const listColors = ['green', 'blue'];

  return (
    <div>
      <p className="text-grey600 text-[14px] font-[500]">검색어</p>
      <h2 className="text-grey900 py-[30px] text-center text-[20px] font-bold">
        {baseKeyword}
      </h2>

      <p className="text-grey600 text-[14px] font-[500]">비교 연관어 선택</p>

      <ul className="flex flex-col gap-[40px] py-[30px]">
        {data?.slice(0, 10)?.map((item, index, arr) => {
          const color = relatedKeywordList.includes(item)
            ? item === relatedKeyword
              ? 'red'
              : listColors.shift()
            : '';
          return (
            <li
              key={index}
              className={cn(
                'flex  items-center  px-[38px] w-[300px] cursor-pointer  text-grey900',
                {
                  'text-[#34D399]': color === 'green',
                  'text-[#818CF8]': color === 'blue',
                  'text-primary600': color === 'red',
                },
              )}
              onClick={() =>
                setRelatedKeywordList((prev) => {
                  if (prev.includes(item)) {
                    return prev.filter((keyword) => keyword !== item);
                  }

                  if (prev.length < 3) {
                    return [...prev, item];
                  }
                  return prev;
                })
              }
            >
              <span
                className={cn(
                  'bg-grey200 h-[24px] w-[24px] rounded-[4px] text-center font-[500]',
                  {
                    'bg-[#d2ffef]': color === 'green',
                    'bg-[#d7dbfa]': color === 'blue',
                    'bg-primary100': color === 'red',
                  },
                )}
              >
                {index + 1}
              </span>
              <span className="flex-1 text-center text-[20px] font-bold">
                {item}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedKeywordList;
