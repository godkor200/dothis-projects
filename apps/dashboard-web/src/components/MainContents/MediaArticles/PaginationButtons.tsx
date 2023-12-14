import type { Dispatch, SetStateAction } from 'react';

import { cn } from '@/utils/cn';

interface Props {
  length: number;
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
}

/**
 * @param length 페이지네이션의 갯수를 지정하는 파라미터입니다.
 * @param pageIndex 현재 페이지의 스타일을 수정하기 위한 pageIndex state 파라미터입니다.
 * @param setPageIndex pageIndex state의 setter 함수 파라미터입니다.
 * @returns
 */
const PaginationButtons = ({ length, pageIndex, setPageIndex }: Props) => {
  return (
    <div className="mb-[66px] mt-[46px] flex justify-center gap-[20px]">
      {[...new Array(length)].map((_, i) => (
        <button
          key={i}
          className={cn(
            'hover:bg-grey200 rounded-[4px] px-[10px] py-[5px] text-[14px]',
            {
              'bg-primary500 text-grey00 hover:bg-primary500': pageIndex === i,
            },
          )}
          onClick={() => setPageIndex(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationButtons;
