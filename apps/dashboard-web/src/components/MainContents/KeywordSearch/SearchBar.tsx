'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useCallback, useState, useTransition } from 'react';

import TermsModal from '@/components/common/Modal/TermsModal/TermsModal';
import SvgComp from '@/components/common/SvgComp';
import { useResetKeywordMutation } from '@/hooks/react-query/mutation/useKeywordMutation';
import {
  useCreateSearchwordMutation,
  useResetSearchwordMutation,
} from '@/hooks/react-query/mutation/useSearchwordMutation';
import useGetAutoCompleteWord from '@/hooks/react-query/query/useGetAutoCompleteWord';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useDebounce from '@/hooks/useDebounce';
import { useIsSignedIn } from '@/store/authStore';
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

  const [open, setOpen] = useState(false);

  const [openModal, setOpenModal] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const isSignIn = useIsSignedIn();

  const [input, setInput] = useState('');

  const [isPending, startTransition] = useTransition();

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
              value={input}
              onChange={(e) => {
                setInput(e.currentTarget.value);
                startTransition(() => handleInput(e.currentTarget.value));
              }}
              // ref={searchInputRef}
              // onKeyDown={handleSubmit}
            />
            <div className="cursor-pointer">
              <SvgComp icon="HeaderPlus" size="40px" />
            </div>
          </div>
          {open && (
            <>
              <div className="inline-flex flex-col gap-[12px] py-10">
                {data
                  ?.filter((item) => item.endsWith('*'))
                  .slice(0, 5)
                  .map((item) => (
                    <span
                      className="text-grey700 cursor-pointer text-[18px]"
                      onClick={() => {
                        if (!isSignIn) {
                          setOpenModal(true);
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
                <MyKeywordList
                  userKeywordList={userData?.personalizationTag}
                  searchWordList={userData?.searchWord}
                />
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

        {open && (
          <div
            className="bg-grey200 text-grey500 rounded-b-8  cursor-pointer py-4 text-center font-bold"
            onClick={(event) => {
              event.stopPropagation();
              setOpen(false);
            }}
          >
            닫기
          </div>
        )}
      </div>
      {openModal && (
        <TermsModal setOnError={setOpenModal}>
          <div className=" bg-grey00 border-grey400 w-[320px] rounded-[8px] border border-solid p-10">
            <div className="mb-[0.625rem] flex justify-center">
              로그인이 필요합니다.
            </div>
            <div
              className="flex justify-center gap-[1.25rem] "
              onClick={() => setOpenModal(false)}
            >
              <Button theme="contained" size="L" paddingX="!px-[85px]">
                확인
              </Button>
            </div>
          </div>
        </TermsModal>
      )}
    </div>
  );
};

export default SearchBar;
