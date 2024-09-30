import type { TKeywords } from '@/types/common';

const NotFoundError = ({ baseKeyword, relatedKeyword }: TKeywords) => {
  return (
    <div className="flex min-h-[240px] flex-1 items-center justify-center pb-10 text-center text-[20px] font-bold">
      <h2>
        <span className="text-primary500">"{baseKeyword}"</span>에 대한 데이터가
        부족합니다.
      </h2>
    </div>
  );
};

export default NotFoundError;
