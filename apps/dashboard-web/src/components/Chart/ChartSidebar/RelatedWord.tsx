import type { Dispatch, SetStateAction } from 'react';

import SvgComp from '@/share/SvgComp';

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
  isSelected: boolean;
  onClick: Dispatch<SetStateAction<number>>;
}

const RelatedWord = ({
  relatedWord,
  isSelected,
  onClick,
}: RelatedWordProps) => {
  return (
    <div
      className={`flex items-center rounded  py-[0.5rem] px-5 ${
        isSelected
          ? 'bg-primary500 text-grey00 [&_path]:stroke-grey00'
          : 'bg-grey00 text-grey600 hover:bg-grey200'
      } cursor-pointer transition-all duration-100 ease-in-out`}
      onClick={() => onClick(relatedWord.rank)}
    >
      <div className="w-5 mr-1.5 font-bold">{relatedWord.rank}</div>
      <div className="flex justify-between grow">
        <div className="w-[4.3rem] mr-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
          {relatedWord.word}
        </div>
        <div className="flex items-center text-center">
          {GAP_ICON[relatedWord.gap as GapType]}
          <div className="text-[0.75rem]	font-medium">{relatedWord.views}</div>
        </div>
      </div>
    </div>
  );
};

export default RelatedWord;
