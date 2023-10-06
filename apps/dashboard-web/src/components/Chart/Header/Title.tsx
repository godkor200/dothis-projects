import { RELATED_WORDS } from '@/mocks';

const KEYWORD = '먹방';

const relatedKeywords = RELATED_WORDS.slice(0, 3)
  .map(({ word }) => word)
  .join(', ');

const Title = () => {
  return (
    <h1 className="typo-h1 bg-primary50 mb-[3.1rem] mt-[60px] flex flex-col rounded-2xl py-10 pl-12 text-center">
      <span className="mb-1">
        <span>{KEYWORD}</span> 외 1개 키워드에서 다루기 좋은 소재는
      </span>
      <span>
        <em className="text-primary500">'{relatedKeywords}'</em>입니다.
      </span>
    </h1>
  );
};

export default Title;
