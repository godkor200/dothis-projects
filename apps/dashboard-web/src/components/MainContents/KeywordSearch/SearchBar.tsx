'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';

import SvgComp from '@/components/common/SvgComp';
import { useResetKeywordMutation } from '@/hooks/react-query/mutation/useKeywordMutation';
import {
  useCreateSearchwordMutation,
  useResetSearchwordMutation,
} from '@/hooks/react-query/mutation/useSearchwordMutation';
import useGetAutoCompleteWord from '@/hooks/react-query/query/useGetAutoCompleteWord';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useDebounce from '@/hooks/useDebounce';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { cn } from '@/utils/cn';

import MyKeywordList from './MyKeywordList';

const SearchBar = () => {
  // 비제어로 하려고 했지만, submit조건이 아니고 계속 트랙킹을 해야해서 적절하지않은 것 같다.
  // const searchInputRef = useRef<HTMLInputElement>(null);

  // const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === 'Enter' && searchInputRef.current?.value !== '') {
  //     // 키워드 정규식이 어떻게 되는지 알아봐야함.
  //     setInput(searchInputRef.current?.value as string);
  //   }
  //   if (e.key === 'Backspace') {
  //     startTransition(() => {
  //       setInput(searchInputRef.current?.value as string);
  //     });
  //   }
  // };

  const [openInput, setOpenInput] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [input, setInput] = useState('');

  const [isPending, startTransition] = useTransition();

  const isSignedIn = useIsSignedIn();

  const { data: userData } = useGetUserInfo();

  const { data } = useGetAutoCompleteWord(searchInput);

  const handleInput = useDebounce((input) => setSearchInput(input), 200, [
    searchInput,
  ]);

  const { mutate: createSearchwordMutate } = useCreateSearchwordMutation();

  const { mutate: resetKeywordMutate } = useResetKeywordMutation();

  const { mutate: resetSearchwordMutate } = useResetSearchwordMutation();

  const handleResetKeyword = () => {
    resetSearchwordMutate();
    resetKeywordMutate();
  };

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

  //로그인 유도 시퀀스

  const { setIsOpenSignUpModal } = useAuthActions();

  const router = useRouter();

  const checkIsSignedIn = () => {
    if (isSignedIn) return true;
    setIsOpenSignUpModal(true);
    // 기존에 contents로 보내고 searchParams를 추가해줘서 Modal이 무거운 느낌이 생겼던 것 같습니다.
    router.push('?steps=sign_up', { scroll: false });
    return false;
  };

  return (
    <div
      className="relative  mx-auto min-h-[52px] max-w-[680px]"
      onClick={() => setOpenInput(true)}
    >
      <div className=" rounded-8 bg-grey00 absolute z-20  box-border w-full pt-[10px] shadow-[0_0_0_2px_rgb(228,228,231)]">
        <div className="px-[20px]">
          <div
            className={cn('flex items-center justify-between pb-[10px]', {
              'border-b-1 border-grey300 ': openInput,
            })}
          >
            <input
              className="w-full  text-[16px]  outline-none"
              placeholder="키워드를 넣어주세요"
              value={input}
              onChange={(e) => {
                setInput(e.currentTarget.value);
                startTransition(() => handleInput(e.currentTarget.value));
              }}
              // ref={searchInputRef}
              // onKeyDown={handleSubmit}
            />
            <div className="cursor-pointer">
              <SvgComp icon="HeaderPlus" size="32px" />
            </div>
          </div>
          {openInput && (
            <>
              <div className="inline-flex flex-col gap-[12px] py-10">
                {data
                  ?.filter((item) => item.endsWith('*'))
                  .slice(0, 5)
                  .map((item) => (
                    <span
                      className="text-grey700 cursor-pointer text-[18px]"
                      onClick={() => {
                        if (!checkIsSignedIn()) {
                          return;
                        }
                        createSearchwordMutate(item.replace('*', ''));
                        return;
                      }}
                    >
                      {item.replace('*', '')}
                    </span>
                  ))}
              </div>
              <p className="text-grey500 text-[18px]">이런 단어를 찾으세요?</p>
              <div className="border-grey300 mt-[20px] flex flex-wrap gap-[10px] border-b-2 pb-[30px]  ">
                {isSignedIn && (
                  <MyKeywordList
                    userKeywordList={userData?.personalizationTag}
                    searchWordList={userData?.searchWord}
                  />
                )}
              </div>
              <div className="my-5 flex items-center justify-between">
                <p className="text-grey500 text-[18px]">키워드 초기화</p>
                <div
                  className="border-1 border-grey500 bg-grey200 rounded-8 cursor-pointer px-5 py-2"
                  onClick={handleResetKeyword}
                >
                  <SvgComp icon="KeywordReset" size={24} />
                </div>
              </div>
            </>
          )}
        </div>

        {openInput && (
          <div
            className="bg-grey200 text-grey500 rounded-b-8  cursor-pointer py-4 text-center font-bold"
            onClick={(event) => {
              event.stopPropagation();
              setOpenInput(false);
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
