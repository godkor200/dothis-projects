'use client';

import { useState } from 'react';

import { RELATED_WORDS } from '@/mocks';

import RelatedWord from './RelatedWord';

const RelatedWordRanking = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  return (
    <div className="border-grey300 bg-grey00 flex h-full w-[11.8rem] flex-col gap-[1.2rem] border-r border-solid py-[2.5rem] pr-[1.25rem]">
      {RELATED_WORDS.map((relatedWord) => (
        <RelatedWord
          key={relatedWord.id}
          relatedWord={relatedWord}
          isSelected={selectedRelatedWord === relatedWord.rank}
          onClick={setSelectedRelatedWord}
        />
      ))}
    </div>
  );
};

export default RelatedWordRanking;
