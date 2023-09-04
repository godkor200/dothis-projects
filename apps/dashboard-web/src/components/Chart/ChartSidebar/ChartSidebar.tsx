'use client';

import { useState } from 'react';

import { RELATED_WORDS } from '@/mocks';

import RelatedWord from './RelatedWord';

const ChartSidebar = () => {
  const [selectedRelatedWord, setSelectedRelatedWord] = useState(1);

  return (
    <div className="flex flex-col gap-[1.2rem] w-[11.8rem] h-full py-[2.5rem] pr-[1.25rem] border-r border-solid border-grey300 bg-grey00">
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

export default ChartSidebar;
