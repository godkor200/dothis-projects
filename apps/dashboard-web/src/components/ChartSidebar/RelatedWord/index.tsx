import ArrowDown from '@/assets/svg/Arrow/ArrowDown';
import ArrowUp from '@/assets/svg/Arrow/ArrowUp';

import { Gap, Rank, RankContent, RelatedWordItem, Views, Word } from './style';

const GAP_ICON = {
  DOWN: <ArrowDown />,
  UP: <ArrowUp />,
};

type GapType = keyof typeof GAP_ICON;

interface RelatedWord {
  rank: number;
  word: string;
  views: number;
  gap: string;
}

interface RelatedWordProps {
  relatedWord: RelatedWord;
}

function RelatedWord({ relatedWord }: RelatedWordProps) {
  return (
    <RelatedWordItem>
      <Rank>{relatedWord.rank}</Rank>
      <RankContent>
        <Word>{relatedWord.word}</Word>
        <Gap>
          {GAP_ICON[relatedWord.gap as GapType]}
          <Views>{relatedWord.views}</Views>
        </Gap>
      </RankContent>
    </RelatedWordItem>
  );
}

export default RelatedWord;
