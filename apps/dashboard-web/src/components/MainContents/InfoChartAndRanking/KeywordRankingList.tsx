'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import Modal from '@/components/common/Modal/Modal';
import RelwordErrorModal from '@/components/common/Modal/ModalContent/RelwordErrorModal';
import {
  useRemoveKeywordMutation,
  useResetKeywordMutation,
} from '@/hooks/react-query/mutation/useKeywordMutation';
import { useResetSearchwordMutation } from '@/hooks/react-query/mutation/useSearchwordMutation';
import useGetRankingRelWords from '@/hooks/react-query/query/useGetRankingRelWords';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import useKeyword from '@/hooks/user/useKeyword';
import { useSelectedRelWordActions } from '@/store/selectedRelWordStore';
import { convertKeywordsToArray } from '@/utils/keyword';

import KeywordRankingItem from './KeywordRankingItem';

const KeywordRankingList = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  const [onErrorModal, setOnErrorModal] = useState(false);
  // 현재 잦은 재요청이 있는 api로 인하여 임시로 생성한 재요청 모달 trigger 상태입니다.
  const [onReTryModal, setOnReTryModal] = useState(false);

  const { hashKeywordList } = useKeyword();
  console.log(hashKeywordList);

  const { mutate: resetKeywordMutate } = useResetKeywordMutation();
  const { mutate: resetSearchwordMutate } = useResetSearchwordMutation();

  const { mutate: removeKeywordMutate } = useRemoveKeywordMutation();

  const {
    data: rankRelWordList,
    isLoading,
    isError,
    refetch,
  } = useGetRankingRelWords(hashKeywordList[0], {
    onError: (data) => {
      if (data.status === 400) {
        setOnReTryModal(true);
        return;
      }
      setOnErrorModal(true);
    },
  });

  const dismissReTryModalCallback = useCallback(() => {
    setOnReTryModal(false);
    refetch();
  }, []);

  const dismissModalCallback = useCallback(() => {
    setOnErrorModal(false);
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

  const { setRelWord } = useSelectedRelWordActions();

  useEffect(() => {
    rankRelWordList && setRelWord(rankRelWordList[selectedRelatedWord - 1]);
  }, [selectedRelatedWord, rankRelWordList]);

  return (
    <>
      <div className="border-grey300 bg-grey00 flex h-auto  w-[11.8rem] flex-col gap-[1.2rem] border-r border-solid py-[2.5rem] pr-[1.25rem]">
        {(isLoading || isError) &&
          [...new Array(10)].map((item, index) => (
            <KeywordRankingItem.skeleton isSelected={index === 0} key={index} />
          ))}
        {rankRelWordList?.slice(0, 10).map((relatedWord, index) => (
          <KeywordRankingItem
            key={index + 1}
            relatedWord={{ word: relatedWord, rank: index + 1 }}
            isSelected={selectedRelatedWord === index + 1}
            onClick={setSelectedRelatedWord}
          />
        ))}
      </div>
      {onErrorModal && (
        <Modal dismissCallback={dismissModalCallback}>
          <RelwordErrorModal dismissCallback={dismissModalCallback} />
        </Modal>
      )}
      {onReTryModal && (
        <Modal dismissCallback={dismissReTryModalCallback}>
          <div className=" rounded-8 bg-grey00 border-grey400 w-[500px] border border-solid p-10">
            <p className="text-t3 text-grey700 mb-5 text-center font-bold">
              많은 요청으로 인해 <br /> 데이터를 가져오는데 실패하였습니다
            </p>
            <div className="flex justify-center gap-[1.25rem]">
              <Button
                theme="outlined"
                size="L"
                onClick={() => dismissReTryModalCallback()}
              >
                재시도
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default KeywordRankingList;
