import type { MouseEvent, MutableRefObject, SetStateAction } from 'react';
import { useRef } from 'react';

import SvgComp from '@/share/SvgComp';

import type { KeywordCategory } from './KeywordSlide';
import * as Style from './style';

interface KeywordCategoryContentProps<T> {
  $active: boolean;
  label: string;
  keyValue: string;
  handleScrollX: (target: MutableRefObject<T | null>) => void;
  setKeywordList: React.Dispatch<SetStateAction<string[]>>;
  setTargetKeywords: React.Dispatch<SetStateAction<string[]>>;
}

const Keyword = <T extends HTMLButtonElement>({
  $active,
  label,
  keyValue,
  handleScrollX,
  setKeywordList,
  setTargetKeywords,
}: KeywordCategoryContentProps<T>) => {
  const targetRef = useRef<T | null>(null);

  //선택된 키워드를 해당 KeywordList에서 아예 제거해버리는 함수입니다.
  const removeKeyword = (event: MouseEvent) => {
    event.stopPropagation();
    setKeywordList((prev) => prev.filter((item) => item !== keyValue));
  };

  const toggleTargetKeyword = (prev: string[], keyword: string) => {
    if (prev.includes(keyword)) {
      return prev.filter((el) => el !== keyValue);
    }
    return [...prev, keyValue];
  };

  const handleToggleKeyword = () => {
    setTargetKeywords((prev) => toggleTargetKeyword(prev, keyValue));

    handleScrollX(targetRef);
  };

  return (
    <Style.Button
      ref={targetRef}
      $active={$active}
      onClick={handleToggleKeyword}
    >
      {label}
      {$active && (
        <SvgComp
          icon="KeywordDelete"
          size="1rem"
          onClick={(event) => removeKeyword(event)}
        />
      )}
    </Style.Button>
  );
};

export default Keyword;
