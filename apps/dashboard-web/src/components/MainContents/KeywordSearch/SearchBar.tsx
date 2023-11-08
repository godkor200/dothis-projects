'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState, useTransition } from 'react';

import SvgComp from '@/components/common/SvgComp';
import useGetAutoCompleteWord from '@/hooks/react-query/query/useGetAutoCompleteWord';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useDebounce from '@/hooks/useDebounce';
import { apiClient } from '@/utils/api/apiClient';
import { cn } from '@/utils/cn';

import MyKeywordList from './MyKeywordList';

const SearchBar = () => {
  const [open, setOpen] = useState(false);

  // 비제어로 하려고 했지만, submit조건이 아니고 계속 트랙킹을 해야해서 적절하지않은 것 같다.
  // const searchInputRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useGetUserInfo();
  const [isPending, startTransition] = useTransition();

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

  const [searchInput, setSearchInput] = useState('');

  const [input, setInput] = useState('');

  const { data } = useGetAutoCompleteWord(searchInput);

  const queryClient = useQueryClient();

  const { mutate } = apiClient(1).user.putUpdatePersonalTag.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
    },
  });

  const { mutate: mutateSearchWord } = apiClient(
    1,
  ).user.putSearchWord.useMutation({
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries(['user']);
    },
  });

  const handleResetKeyword = () => {
    mutateSearchWord({
      body: { searchWord: [] },
    });
    mutate({
      body: { tag: resetKeyword(userData?.personalizationTag) },
    });
  };

  const resetKeyword = (userKeyword: string | undefined | null) => {
    if (userKeyword === null || userKeyword === undefined) {
      throw new Error('데이터를 생성하는데 문제가 생겼습니다.');
    }

    const dataArray = userKeyword.split(',');

    for (let i = 1; i < dataArray.length; i++) {
      dataArray[i] = dataArray[i].replace('#', '');
    }
    return dataArray;
  };

  const handleCreateSearchWord = (word: string) => {
    console.log(createSearchWord(userData?.searchWord, word));
    mutateSearchWord({
      body: { searchWord: createSearchWord(userData?.searchWord, word) },
    });
  };

  const createSearchWord = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 생성하는데 문제가 생겼습니다.');
      }

      const dataArray = userKeyword ? userKeyword.split(',') : [];

      const index = dataArray.indexOf(keyword);

      const hashindex = dataArray.indexOf(`${keyword}#`);

      if (index !== -1 || hashindex !== -1) {
        if (hashindex !== -1) {
          return dataArray;
        }

        dataArray[index] = `${keyword}#`;
      } else {
        dataArray.unshift(`${keyword}#`);
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

  const handleInput = useDebounce((input) => setSearchInput(input), 200, [
    searchInput,
  ]);

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
              <div className="flex flex-col gap-[12px] py-10">
                {data
                  ?.filter((item) => item.endsWith('*'))
                  .slice(0, 5)
                  .map((item) => (
                    <p
                      className="text-grey700 cursor-pointer text-[18px]"
                      onClick={() =>
                        handleCreateSearchWord(item.replace('*', ''))
                      }
                    >
                      {item.replace('*', '')}
                    </p>
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
    </div>
  );
};

export default SearchBar;
