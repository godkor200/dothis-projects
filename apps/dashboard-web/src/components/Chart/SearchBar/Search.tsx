'use client';

import type { KeyboardEvent } from 'react';
import { useRef } from 'react';

import SvgComp from '@/share/SvgComp';

const SearchBar = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInputRef.current?.value !== '') {
      // 키워드 정규식이 어떻게 되는지 알아봐야함.
    }
  };
  return (
    <div className="relative  max-w-[50rem] mx-auto">
      <input
        className="w-full border-2 border-solid border-grey300  rounded-8 py-5 pr-14 pl-5 box-border text-[1.25rem]  bg-grey00 outline-none transition focus:border-primary300 "
        placeholder="키워드를 넣어주세요"
        ref={searchInputRef}
        onKeyDown={handleSubmit}
      />
      <div className="absolute right-4 top-2/4 -translate-y-1/2">
        <SvgComp icon="HeaderPlus" size="3.375rem" />
      </div>
    </div>
  );
};

export default SearchBar;
