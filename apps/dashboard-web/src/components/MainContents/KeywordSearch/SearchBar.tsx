'use client';

import { useQueryClient } from '@tanstack/react-query';
import type { KeyboardEvent } from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import { GUEST_KEYWORD } from '@/constants/guestKeyword';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useKeyword from '@/hooks/user/useKeyword';
import { apiClient } from '@/utils/api/apiClient';
import { cn } from '@/utils/cn';
import { convertKeywordsToArray } from '@/utils/keyword';

import KeywordItem from './KeywordItem';
import MyKeywordList from './MyKeywordList';
import * as Style from './style';

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useGetUserInfo();

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInputRef.current?.value !== '') {
      // 키워드 정규식이 어떻게 되는지 알아봐야함.
    }
  };

  const removeHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }
      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 제거합니다.
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          dataArray[i] = dataArray[i].replace('#', '');
        }
      }

      return dataArray;
    },
    [],
  );

  const addHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }
      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 추가합니다.
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          dataArray[i] += '#';
        }
      }

      return dataArray;
    },
    [],
  );

  const checkHashKeyword = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        return false;
      }

      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          return dataArray[i].endsWith('#');
        }
      }
      // 키워드를 찾지 못한 경우
      return false;
    },
    [],
  );

  return (
    <div
      className="relative  mx-auto max-w-[50rem]"
      onClick={() => setOpen(true)}
    >
      <div className=" rounded-8 bg-grey00 box-border w-full  pt-[15px] shadow-[0_0_0_2px_rgb(228,228,231)] ">
        <div className="px-[30px]">
          <div
            className={cn('flex items-center justify-between pb-[15px]', {
              'border-b-1 border-grey300 ': open,
            })}
          >
            <input
              className="w-full  text-[24px]  outline-none"
              placeholder="키워드를 넣어주세요"
              ref={searchInputRef}
              onKeyDown={handleSubmit}
            />
            <div className="cursor-pointer">
              <SvgComp icon="HeaderPlus" size="40px" />
            </div>
          </div>
          {open && (
            <>
              <div className="py-5">자동완성 섹션</div>
              <p className="text-grey500 text-[18px]">이런 단어를 찾으세요?</p>
              <div className="border-grey300 mt-[20px] flex flex-wrap gap-[10px] border-b-2 pb-[30px]  ">
                <MyKeywordList
                  userKeywordList={userData?.personalizationTag}
                  searchWordList={userData?.searchWord}
                />
              </div>
              <div className="my-5 flex items-center justify-between">
                <p className="text-grey500 text-[18px]">키워드 초기화</p>
                <div className="border-1 border-grey500 bg-grey200 rounded-8 cursor-pointer px-5 py-2">
                  <SvgComp icon="KeywordReset" size={24} />
                </div>
              </div>
            </>
          )}
        </div>

        {open && (
          <div
            className="bg-grey200 text-grey500 rounded-b-8  py-4 text-center font-bold"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
            }}
          >
            닫기
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
