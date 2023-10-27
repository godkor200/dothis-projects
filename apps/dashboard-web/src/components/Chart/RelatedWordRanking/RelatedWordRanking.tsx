'use client';

import { useEffect, useState } from 'react';

import useRelWord from '@/hooks/user/useRelWord';
import { RELATED_WORDS } from '@/mocks';
import useGetRelWords from '@/query/user/useGetRelWords';
import {
  useSelectedRelWord,
  useSelectedRelWordActions,
} from '@/store/selectedRelWordStore';

import RelatedWord from './RelatedWord';

const RelatedWordRanking = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  const { relWordList } = useRelWord();

  const { setRelWord } = useSelectedRelWordActions();

  useEffect(() => {
    setRelWord(relWordList[selectedRelatedWord - 1]);
  }, [selectedRelatedWord, relWordList]);

  return (
    <div className="border-grey300 bg-grey00 flex h-full w-[11.8rem] flex-col gap-[1.2rem] border-r border-solid py-[2.5rem] pr-[1.25rem]">
      {relWordList.slice(0, 10).map((relatedWord, index) => (
        <RelatedWord
          key={index + 1}
          relatedWord={{ word: relatedWord, rank: index + 1 }}
          isSelected={selectedRelatedWord === index + 1}
          onClick={setSelectedRelatedWord}
        />
      ))}
    </div>
  );
};

export default RelatedWordRanking;
