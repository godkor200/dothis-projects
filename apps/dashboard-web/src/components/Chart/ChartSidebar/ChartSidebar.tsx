'use client';

import { useState } from 'react';

import { RELATED_WORDS } from '@/mocks';

import RelatedWord from './RelatedWord';

const ChartSidebar = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  return (
    <div className="flex flex-col gap-[20px] w-[12.8rem] py-10 px-5 border border-solid border-grey400 rounded-lg bg-grey00">
      {RELATED_WORDS.map((relatedWord, idx) => (
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

export default ChartSidebar;
