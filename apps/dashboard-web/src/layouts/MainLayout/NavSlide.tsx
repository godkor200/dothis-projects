'use client';

import { theme } from '@dothis/theme/dashboard/index';
import styled, { css } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

import NavSliderContent from './NavSlideContent';

function NavSlider() {
  return (
    <KeywordTapContiner>
      <Button $active={true}>
        먹방
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>
      <Button $active={true}>
        먹방맛집
        <SvgComp icon="NavSlideDelete" size="1rem" />
      </Button>

      <NavSliderContent />
    </KeywordTapContiner>
  );
}

export default NavSlider;

const KeywordTapContiner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;

  margin-bottom: 1.5rem;
  padding: 1.875rem 3rem;

  position: sticky;
  top: 0rem;

  overflow-x: auto;
  justify-content: start;

  @media screen and (min-width: 1280px) {
    overflow-x: visible;
  }

  background-color: white;

  transition: all 0.5s ease;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Button = styled.button<{ $active: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;

  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;

  font-size: 1rem;
  font-weight: 500;
  color: ${theme.colors.grey40};
  background-color: ${theme.colors.grey00};

  border: 1px solid ${theme.colors.grey40};
  ${({ $active }) =>
    $active &&
    css`
      border-color: ${theme.colors.primary40};
      background-color: rgba(${theme.colors.primary10}, 0.1);
      color: ${theme.colors.primary40};
    `}
`;
