'use client';

import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Modal from '@/components/common/Modal/Modal';
import RelwordErrorModal from '@/components/common/Modal/ModalContent/RelwordErrorModal';
import useGetRelWords from '@/hooks/react-query/query/useGetRelWords';
import { useSelectedRelWordActions } from '@/store/selectedRelWordStore';
import { convertKeywordsToArray } from '@/utils/keyword';

import KeywordRankingItem from './KeywordRankingItem';

const KeywordRankingList = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  const [onErrorModal, setOnErrorModal] = useState(false);

  const {
    data: relWordsData,
    isLoading,
    isError,
    refetch,
  } = useGetRelWords({
    onError: () => {
      setOnErrorModal(true);
    },
  });

  const relWordList = convertKeywordsToArray(relWordsData?.relWords);

  const { setRelWord } = useSelectedRelWordActions();

  useEffect(() => {
    setRelWord(relWordList[selectedRelatedWord - 1]);
  }, [selectedRelatedWord, relWordList]);

  return (
    <>
      <div className="border-grey300 bg-grey00 flex h-full w-[11.8rem] flex-col gap-[1.2rem] border-r border-solid py-[2.5rem] pr-[1.25rem]">
        {(isLoading || isError) &&
          [...new Array(10)].map((item, index) => (
            <KeywordRankingItem.skeleton isSelected={index === 0} key={index} />
          ))}
        {relWordList.slice(0, 10).map((relatedWord, index) => (
          <KeywordRankingItem
            key={index + 1}
            relatedWord={{ word: relatedWord, rank: index + 1 }}
            isSelected={selectedRelatedWord === index + 1}
            onClick={setSelectedRelatedWord}
          />
        ))}
      </div>
      {onErrorModal && (
        <Modal
          dismissCallback={() => {
            setOnErrorModal(false);
            refetch();
          }}
        >
          <RelwordErrorModal
            dismissCallback={() => {
              setOnErrorModal(false);
              refetch();
            }}
          />
        </Modal>
      )}
    </>
  );
};

export default KeywordRankingList;
