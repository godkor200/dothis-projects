'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useCallback, useEffect, useState } from 'react';

import RelatedRetryModal from '@/components/common/Modal/ModalContent/RelatedRetryModal';
import RelwordErrorModal from '@/components/common/Modal/ModalContent/RelwordErrorModal';
import {
  useRemoveKeywordMutation,
  useResetKeywordMutation,
} from '@/hooks/react-query/mutation/useKeywordMutation';
import { useResetSearchwordMutation } from '@/hooks/react-query/mutation/useSearchwordMutation';
import useGetRankingWordList from '@/hooks/react-query/query/useGetRankingWordList';
import useKeyword from '@/hooks/user/useKeyword';
import { useIsSignedIn } from '@/store/authStore';
import { useModalActions } from '@/store/modalStore';
import { useSelectedWordActions } from '@/store/selectedWordStore';

import KeywordRankingItem from './KeywordRankingItem';

const KeywordRankingList = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  // const [onErrorModal, setOnErrorModal] = useState(false);
  // 현재 잦은 재요청이 있는 api로 인하여 임시로 생성한 재요청 모달 trigger 상태입니다.
  // 이런 컴포넌트 속 여러 모달을 불러올 경우를 대비해 dismiss및 content 컴포넌트를 한 곳에 지정할 수 있는 전역 or 공용 hook을 생성하려 합니다
  // const [onReTryModal, setOnReTryModal] = useState(false);

  const { hashKeywordList } = useKeyword();

  const { setModalOpen, setModalContent, initializeModal } = useModalActions();

  const { mutate: resetKeywordMutate } = useResetKeywordMutation();
  const { mutate: resetSearchwordMutate } = useResetSearchwordMutation();

  const { mutate: removeKeywordMutate } = useRemoveKeywordMutation();

  const isSignedIn = useIsSignedIn();

  // const {
  //   data: rankRelWordList,
  //   isLoading,
  //   isError,
  //   refetch,
  // } = useGetRankingRelWords(hashKeywordList[0], {
  //   onError: (data) => {
  //     if (data.status === 400 || 429) {
  //       setOnReTryModal(true);
  //       return;
  //     }
  //     setOnErrorModal(true);
  //   },
  // });

  const {
    data: rankRelWordList,
    isLoading,
    isError,
    isErrorKeyword,
  } = useGetRankingWordList(hashKeywordList, {
    onError: (data) => {
      if (!isSignedIn || data.status === 400 || data.status === 429) {
        setModalContent(
          <RelatedRetryModal dismissCallback={dismissReTryModalCallback} />,
        );

        setModalOpen(true);
        return;
      }
      setModalContent(
        <RelwordErrorModal dismissCallback={dismissModalCallback} />,
      );
      setModalOpen(true);
      return;
    },
  });

  // 모달 리팩토링하면서 같이 작업

  const dismissReTryModalCallback = useCallback(() => {
    initializeModal();
  }, []);

  const dismissModalCallback = useCallback(() => {
    initializeModal();
    if (hashKeywordList.length <= 1) {
      // 만약에 reset시켜주는 키워드가 이상한 키워드일 경우 계속 먹통일 수 있다. (예외가 필요하다.)
      resetKeywordMutate();
      resetSearchwordMutate();
      return;
    }
    // 키워드가 여러개로 연관어를 가져올 수 있을경우 어떤 것이 빠져야할지 모호하므로
    // 어떤거를 뺴줘야할지 User가 직접 선택하는  인터페이스를 제공해줘야할듯, 지금 Modal똑같은 형태지만, 어떤거를 제거하시겠습니까 라는 안내 인터페이스가 필요

    removeKeywordMutate(hashKeywordList[0]);
  }, [hashKeywordList]);

  const { setRelWord } = useSelectedWordActions();

  useEffect(() => {
    rankRelWordList.length !== 0 &&
      setRelWord(rankRelWordList[selectedRelatedWord - 1]);
  }, [selectedRelatedWord, rankRelWordList]);

  // false isError에서 하나라도 true면 보여야함  (맨처음 fetch되었지만error일 수도 있으니깐)
  return (
    <>
      <div className="border-grey300 bg-grey00 flex h-auto  w-[11.8rem] flex-col gap-[1.2rem] border-r border-solid py-[2.5rem] pr-[1.25rem]">
        {rankRelWordList.length === 0 &&
          [...new Array(10)].map((item, index) => (
            <KeywordRankingItem.skeleton isSelected={index === 0} key={index} />
          ))}
        {rankRelWordList?.slice(0, 10).map((relatedWord, index) => (
          <KeywordRankingItem
            key={index + 1}
            relatedWord={{ word: relatedWord.relword, rank: index + 1 }}
            isSelected={selectedRelatedWord === index + 1}
            onClick={setSelectedRelatedWord}
          />
        ))}
      </div>
    </>
  );
};

export default KeywordRankingList;
