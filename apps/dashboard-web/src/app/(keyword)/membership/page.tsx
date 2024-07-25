'use client';

import { useEffect } from 'react';

import { useModalActions } from '@/store/modalStore';

const Page = () => {
  const { initializeModal } = useModalActions();

  useEffect(() => {
    initializeModal();
    // 해당 부분에서 새로고침으로 진입 시 searchParams을 지우고 현재 intercepting인지 아닌지의 구분자로써 searchParams을 사용하려고 했지만, router replace로 searchParams을 지우면 그거에 따른 intercepting 이 또 일어나서 또 intercepting 페이지가 보여진다

    // 지금 구조에서 membership이 (keyword) 안에서 존재하기때문에 불가능
  }, []);
  return (
    <div className="flex h-full flex-col items-center justify-center text-[48px] font-bold">
      <h2 className="text-grey500 border-grey500 mb-[1rem] flex h-20  w-20 items-center justify-center rounded-full border-4 text-[48px] font-bold">
        !
      </h2>
      준비 중인 서비스입니다.
    </div>
  );
};

export default Page;
