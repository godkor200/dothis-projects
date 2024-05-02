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

    /**
     * 밑에 #을 붙여준 이유 -> 현재 keywordSlide는 활성화가 된 단어만 list로 불러와서 getHashKeyword메서드로 #을 공백으로 replace해주었다
     * 그로인해 setDeleteSearchword에서 제거 조건에서 필요로하는 #이 추가되지않음에 따라 수동으로 #을 추가로 삽입해주었다.
     */
    setDeleteSearchword!(keyValue + '#');
  };

  const handleRemoveKeyword = (keyword: string) => {
    setRemoveKeyword(keyword);
    handleScrollX(targetRef);
  };

  return (
    <>
      {label && (
        <Style.Button
          ref={targetRef}
          $active={$active}
          onClick={() => handleRemoveKeyword(keyValue)}
        >
          {label}
          {isSearchWord && (
            <SvgComp
              icon="KeywordDelete"
              size={10}
              onClick={(event) => deleteKeyword(event, keyValue)}
            />
          )}
        </Style.Button>
      )}
    </>
  );
};

export default KeywordItem;
