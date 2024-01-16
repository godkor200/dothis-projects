'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import Modal from '@/components/common/Modal/Modal';
import SvgComp from '@/components/common/SvgComp';
import useGetAutoCompleteWord from '@/hooks/react-query/query/useGetAutoCompleteWord';
import useDebounce from '@/hooks/useDebounce';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { cn } from '@/utils/cn';

interface Props {
  setKeywordList: (keyword: string) => void;
}

const SearchBar = ({ setKeywordList }: Props) => {
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

  const [input, setInput] = useState('');

  const [isPending, startTransition] = useTransition();

  const isSignedIn = useIsSignedIn();

  const { data } = useGetAutoCompleteWord(searchInput);

  const handleInput = useDebounce((input) => setSearchInput(input), 200, [
    searchInput,
  ]);

  //로그인 유도 시퀀스

  const { setIsOpenSignUpModal } = useAuthActions();

  const router = useRouter();

  const checkIsSignedIn = () => {
    if (isSignedIn) return true;
    setIsOpenSignUpModal(true);
    // 기존에 contents로 보내고 searchParams를 추가해줘서 Modal이 무거운 느낌이 생겼던 것 같습니다.
    router.push('?steps=signUp');
    return false;
  };

  return (
    <div
      className="relative  mx-auto min-h-[52px] max-w-[680px]"
      onClick={() => setOpen(true)}
    >
      <div className=" rounded-8 bg-grey00 absolute z-20  box-border w-full pt-[10px] shadow-[0_0_0_2px_rgb(228,228,231)]">
        <div className="px-[20px]">
          <div
            className={cn('flex items-center justify-between pb-[10px]', {
              'border-b-1 border-grey300 ': open,
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
                        if (!checkIsSignedIn()) {
                          return;
                        }
                        setKeywordList(item);
                        return;
                      }}
                    >
                      {item.replace('*', '')}
                    </span>
                  ))}
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
        <Modal dismissCallback={() => setOpenModal(false)}>
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
        </Modal>
      )}
    </div>
  );
};

export default SearchBar;
