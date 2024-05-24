'use client';
import { useRouter } from 'next/navigation';
import type { KeyboardEvent } from 'react';
import { useCallback, useState, useTransition } from 'react';

import SignUpModal from '@/components/common/Modal/ModalContent/SignUpModal';
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
import { useModalActions } from '@/store/modalStore';
import { cn } from '@/utils/cn';

const GNBSearchbar = () => {
  const [openInput, setOpenInput] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [input, setInput] = useState('');

  const [isPending, startTransition] = useTransition();

  const isSignedIn = useIsSignedIn();

  const { setIsModalOpen, setModalContent } = useModalActions();

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
    setOpenInput(false);
    setIsOpenSignUpModal(true);
    // 기존에 contents로 보내고 searchParams를 추가해줘서 Modal이 무거운 느낌이 생겼던 것 같습니다.

    setModalContent(<SignUpModal />);
    setIsModalOpen(true);
    return false;
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    currentInput: string,
  ) => {
    if (!checkIsSignedIn()) {
      return;
    }

    if (event.key === 'Enter') {
      if (
        data &&
        data?.filter((item) => item.endsWith('*'))[0]?.replace('*', '') ===
          currentInput
      ) {
        // 엔터 키가 눌렸을 때 실행할 동작

        createSearchwordMutate(currentInput);
      }
    }
  };

  return (
    <div className="relative">
      <div className="border-grey400 flex w-[368px] items-center gap-[10px] rounded-[50px] border px-[30px] py-[14px]">
        <SvgComp icon="SearchIcon" size={16} />

        <input
          className="text-grey600  placeholder:text-grey400  w-full text-[16px]  outline-none"
          placeholder="키워드를 넣어주세요"
          value={input}
          onChange={(e) => {
            setInput(e.currentTarget.value);
            startTransition(() => handleInput(e.currentTarget.value));
          }}
          // ref={searchInputRef}
          onKeyDown={(e) => {
            handleKeyDown(e, e.currentTarget.value);
          }}
        />
      </div>
      {!!data?.length && (
        <div className=" border-grey400 bg-grey00 absolute mt-[10px] inline-flex w-full flex-col gap-[12px] rounded-[20px] border px-2 py-5">
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
      )}
    </div>
  );
};

export default GNBSearchbar;
