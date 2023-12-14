import type { Dispatch, SetStateAction } from 'react';

import { cn } from '@/utils/cn';

interface Props {
  length: number;
  pageIndex: number;
  setPageIndex: Dispatch<SetStateAction<number>>;
}

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
