import { theme } from '@dothis/theme/dashboard/index';
import type { SetStateAction } from 'react';
import { MutableRefObject, useRef } from 'react';
import styled, { css } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

import type { KeywordCategory } from './NavSlide';

interface KeywordCategoryContentProps {
  $active: boolean;
  label: string;
  keyValue: string;
  setKeywordCategory: React.Dispatch<SetStateAction<KeywordCategory[]>>;
}

function NavSlideContent({
  $active,
  label,
  keyValue,
  setKeywordCategory,
}: KeywordCategoryContentProps) {
  return (
    <Button
      $active={$active}
      onClick={() => {
        setKeywordCategory((prev) =>
          prev.includes(keyValue as KeywordCategory)
            ? prev.filter((el) => el !== keyValue)
            : [...prev, keyValue as KeywordCategory],
        );
      }}
    >
      {label}
      <SvgComp icon="NavSlideDelete" size="1rem" />
    </Button>
  );
}

export default NavSlideContent;

const Button = styled.button<{ $active: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;

  position: relative;

  padding: 0.5rem 1.25rem;
  border: 1px solid white;
  border-radius: 0.5rem;
  box-sizing: border-box;

  font-size: 1rem;
  font-weight: 500;

  color: ${theme.colors.grey40};
  background-color: ${theme.colors.grey00};
  box-shadow: inset 0 0 0 2px ${theme.colors.grey40};

  ${({ $active }) =>
    $active &&
    css`
      border: 1px solid white;

      background-color: rgba(${theme.colors.primary10}, 0.1);
      color: ${theme.colors.primary40};
      box-shadow: inset 0 0 0 2px ${theme.colors.primary40};
    `}
`;
