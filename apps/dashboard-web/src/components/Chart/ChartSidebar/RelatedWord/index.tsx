import SvgComp from '@/share/SvgComp';

import { Gap, Rank, RankContent, RelatedWordItem, Views, Word } from './style';

const GAP_ICON = {
  DOWN: <SvgComp icon="ChartArrowDown" size={10} />,
  UP: <SvgComp icon="ChartArrowUp" size={10} />,
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
