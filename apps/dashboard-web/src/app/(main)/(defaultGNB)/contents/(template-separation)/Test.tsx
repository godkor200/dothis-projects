'use client';

import { useIsFetching } from '@tanstack/react-query';
import { useEffect } from 'react';

import LoginLoadingComponent from '@/components/Auth/LoginLoading';
import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useKeyword from '@/hooks/user/useKeyword';
import { useModalActions, useModalOpen } from '@/store/modalStore';

const Test = () => {
  const test = useIsFetching({});

  //   console.log(test);

  const { setModalOpen, setModalContent } = useModalActions();
  const isOpenModal = useModalOpen();

  const handleModal = () => {
    setModalContent(<LoginLoadingComponent />);
    setModalOpen(true);
  };

  const { hashKeywordList } = useKeyword();

  const {
    data: rankRelWordList,
    isLoading,
    isError,
    isErrorKeyword,
  } = useGetRankingWordList(hashKeywordList);

  useEffect(() => {
    if (isLoading) {
      setModalContent(<LoginLoadingComponent />);
      setModalOpen(true);
      return;
    }
    if (!isError) {
      setModalContent(null);
      setModalOpen(false);
    }

    // console.log(test, isOpenModal);
    // if (test) {
    //   setModalContent(<LoginLoadingComponent />);
    //   setModalOpen(true);

    //   return;
    // } else {
    //   setTimeout(() => {
    //     console.log(test);
    //     setModalContent(null);
    //     setModalOpen(false);
    //   }, 500);
    // }
  }, [isLoading, isError]);

  return (
    <div className="border-0 outline-0">
      테스트 박스입니다
      <button onClick={handleModal} className="block ">
        클릭
      </button>
    </div>
  );
};

export default Test;
