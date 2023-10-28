import type { Dispatch, SetStateAction } from 'react';

interface RelatedWord {
  rank: number;
  word: string;
}

interface RelatedWordProps {
  relatedWord: RelatedWord;
  isSelected: boolean;
  onClick: Dispatch<SetStateAction<number>>;
}

const KeywordRankingItem = ({
  relatedWord,
  isSelected,
  onClick,
}: RelatedWordProps) => {
  return (
    <div
      className={`flex items-center rounded px-5 py-[0.5rem] ${
        isSelected
          ? 'bg-primary500 text-grey00'
          : 'bg-grey00 text-grey600 hover:bg-grey200'
      } cursor-pointer transition-all duration-100 ease-in-out`}
      onClick={() => onClick(relatedWord.rank)}
    >
      <div className="mr-1.5 w-5 font-bold">{relatedWord.rank}</div>
      <div className="w-full truncate">{relatedWord.word}</div>
    </div>
  );
};

export default KeywordRankingItem;
