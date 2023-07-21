import type { MutableRefObject, SetStateAction } from 'react';
import { useRef } from 'react';

import SvgComp from '@/share/SvgComp';

import type { KeywordCategory } from './NavSlide';
import * as Style from './style';

interface KeywordCategoryContentProps<T> {
  $active: boolean;
  label: string;
  keyValue: string;
  handleScrollX: (target: MutableRefObject<T | null>) => void;
  setKeywordCategory: React.Dispatch<SetStateAction<KeywordCategory[]>>;
}

const NavSlideContent = <T extends HTMLButtonElement>({
  $active,
  label,
  keyValue,
  handleScrollX,
  setKeywordCategory,
}: KeywordCategoryContentProps<T>) => {
  const targetRef = useRef<T | null>(null);
  return (
    <Style.Button
      ref={targetRef}
      $active={$active}
      onClick={() => {
        setKeywordCategory((prev) =>
          prev.includes(keyValue as KeywordCategory)
            ? prev.filter((el) => el !== keyValue)
            : [...prev, keyValue as KeywordCategory],
        );
        handleScrollX(targetRef);
      }}
    >
      {label}
      <SvgComp icon="NavSlideDelete" size="1rem" />
    </Style.Button>
  );
};

export default NavSlideContent;
