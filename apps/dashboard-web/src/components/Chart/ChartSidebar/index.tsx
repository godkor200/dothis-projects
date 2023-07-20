'use client';

import { RELATED_WORDS } from '@/mocks';

import RelatedWord from './RelatedWord';
import { RelatedWordList } from './style';

function ChartSidebar() {
  return (
    <RelatedWordList>
      {RELATED_WORDS.map((relatedWord) => (
        <RelatedWord key={relatedWord.id} relatedWord={relatedWord} />
      ))}
    </RelatedWordList>
  );
}

export default ChartSidebar;
