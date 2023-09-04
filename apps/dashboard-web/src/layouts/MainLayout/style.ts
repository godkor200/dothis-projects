import type { DefaultTheme } from 'styled-components';
import styled, { css } from 'styled-components';

// SideBar.tsx
export const IconBox = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.grey00};
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.grey300};
`;

export const SideText = styled.span`
  padding-top: 0.75rem;
  padding-left: 1.25rem;
  color: ${({ theme }) => theme.colors.grey500};
  visibility: hidden;
  opacity: 0;
  white-space: nowrap;
`;

const hover_active = ($isInActive: boolean, theme: DefaultTheme) => css`
  padding: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${!$isInActive
    ? theme.colors.primary50
    : theme.colors.grey200};
  ${$isInActive && `box-shadow: 0px 0px 0px 1px ${theme.colors.grey300};`}

  transition: none;

  ${IconBox} {
    padding: 0;
    border-radius: 0;
    background-color: ${!$isInActive
      ? theme.colors.primary50
      : theme.colors.grey200};
    box-shadow: 0 0 0 0;
    transition: none;
  }

  ${SideText} {
    padding-top: 0;
    padding-left: 2rem;
    /* IconBox padding이 없어지다보니 rem값을 추가해주었다. */
    transition: none;
    color: ${!$isInActive && theme.colors.primary500};
  }
  & path {
    fill: ${$isInActive && theme.colors.grey200};
    stroke: ${$isInActive && theme.colors.grey500};
  }
`;

export const IconWrapper = styled.div<{ $isInActive: boolean }>`
  display: flex;
  width: 3.125rem;
  height: 3.125rem;

  border-radius: 0.5rem;

  &:hover {
    ${({ theme, $isInActive }) => hover_active($isInActive, theme)}
  }

  ${({ theme, $isInActive }) =>
    !$isInActive && hover_active($isInActive, theme)}

  ${({ theme, $isInActive }) => css`
    & path {
      fill: ${$isInActive && theme.colors.grey00};
      stroke: ${$isInActive && theme.colors.grey500};
    }
  `}
`;

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;

  width: 6rem;
  height: 100vh;
  padding: 1.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.grey400};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.grey00};
  transition: all 0.3s ease-out;

  &:hover {
    width: 16.625rem;
    z-index: 9999;

    ${SideText} {
      visibility: visible;
      opacity: 1;
      transition: opacity 1s ease-out;
    }

    ${IconWrapper} {
      width: 13.625rem;
      transition: width 0.3s ease-out;
    }
  }
`;

// NavSlide.tsx
export const KeywordTapContiner = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.875rem 3rem;
  position: sticky;
  top: 0rem;
  background-color: white;
  transition: all 0.5s ease;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowButton = styled.button`
  position: relative;

  /* 오른쪽 정렬이 필요 (Keyword List가 적을 때) */
  margin: 0 0 0 auto;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.grey500};
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
    pointer-events: none;
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

// NavSlideContent
export const Button = styled.button<{ $active: boolean }>`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-shrink: 0;
  position: relative;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.grey00};
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grey500};
  background-color: ${({ theme }) => theme.colors.grey00};
  box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.grey500} inset;

  ${({ $active, theme }) =>
    $active &&
    css`
      box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary500}
        inset;
      background-color: ${theme.colors.primary50};
      color: ${theme.colors.primary500};
    `}
`;
