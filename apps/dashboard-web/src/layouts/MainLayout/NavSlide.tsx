'use client';

import { theme } from '@dothis/theme/dashboard/index';
import styled, { css } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

import NavSliderContent from './NavSlideContent';

function NavSlider() {
  return (
    <KeywordTapContiner>
      <ResetButton>
        <SvgComp icon="NavSlideReset" size="1.5rem" />
      </ResetButton>
      <ButtonContainer>
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
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
        <Button $active={true}>
          먹방맛집
          <SvgComp icon="NavSlideDelete" size="1rem" />
        </Button>
      </ButtonContainer>
      <ArrowButton />

      <NavSliderContent />
    </KeywordTapContiner>
  );
}

export default NavSlider;

const KeywordTapContiner = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;

  margin-bottom: 1.5rem;
  padding: 1.875rem 3rem;

  position: sticky;
  top: 0rem;

  overflow-x: hidden;
  justify-content: start;

  background-color: white;

  transition: all 0.5s ease;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;

  overflow-x: hidden;
`;

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

const ArrowButton = styled.button`
  position: relative;

  padding: 0.5rem 1.25rem;
  border: 1px solid ${theme.colors.grey40};
  border-radius: 0.5rem;

  &::before {
    content: '';
    display: inline-block;

    position: absolute;
    top: 0;
    bottom: 0;
    /* ArrowButton에 좌우 패팅만큼  */
    right: 2.625rem;

    width: 10rem;

    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.4) 20%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0.9) 60%,
      white 70%
    );
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;

    border: solid black;
    border-width: 0 2px 2px 0;
    padding: 0.25rem;

    transform: translate(20%, -50%) rotate(-45deg);
  }
`;

const ResetButton = styled.button`
  padding: 0.5rem 1.25rem;
  border: 1px solid ${theme.colors.grey40};
  border-radius: 0.5rem;
`;
