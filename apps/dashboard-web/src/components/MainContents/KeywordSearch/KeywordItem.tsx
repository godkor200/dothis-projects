import type { MouseEvent, MutableRefObject } from 'react';
import { useRef } from 'react';

import SvgComp from '@/components/common/SvgComp';

import * as Style from './style';

interface KeywordCategoryContentProps<T> {
  $active: boolean;
  label: string;
  keyValue: string;
  isSearchWord: boolean;
  handleScrollX: (target: MutableRefObject<T | null>) => void;
  setRemoveKeyword: (keyword: string) => void;
  setDeleteSearchword?: (keyword: string) => void;
}

const KeywordItem = <T extends HTMLButtonElement>({
  $active,
  label,
  keyValue,
  isSearchWord,
  handleScrollX,
  setRemoveKeyword,
  setDeleteSearchword,
}: KeywordCategoryContentProps<T>) => {
  const targetRef = useRef<T | null>(null);

  //선택된 키워드를 해당 KeywordList에서 아예 제거해버리는 함수입니다.
  const deleteKeyword = (event: MouseEvent, keyValue: string) => {
    event.stopPropagation();
    setDeleteSearchword!(keyValue);
  };

  const handleRemoveKeyword = (keyword: string) => {
    setRemoveKeyword(keyword);
    handleScrollX(targetRef);
  };

  return (
    <Style.Button
      ref={targetRef}
      $active={$active}
      onClick={() => handleRemoveKeyword(keyValue)}
    >
      {label}
      {isSearchWord && (
        <SvgComp
          icon="KeywordDelete"
          size="1rem"
          onClick={(event) => deleteKeyword(event, keyValue)}
        />
      )}
    </Style.Button>
  );
};

export default KeywordItem;
