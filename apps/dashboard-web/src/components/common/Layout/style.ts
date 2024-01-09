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
  font-size: 1rem;
  line-height: 1rem;
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
    padding: 0;

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
  width: 2.5rem;
  height: 2.5rem;

  border-radius: 0.5rem;

  &:hover {
    ${({ theme, $isInActive }) => hover_active($isInActive, theme)}
    cursor: pointer;
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
  position: fixed;

  /* top:0;
  bottom:0; */
  display: flex;
  flex-direction: column;
  gap: 3.75rem;

  width: 5rem;
  height: 100%;
  padding: 1.5rem 1rem;
  border-right: 1px solid ${({ theme }) => theme.colors.grey400};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.grey00};
  transition: all 0.3s ease-out;
  z-index: 25;

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

  @media screen and (min-width: 1600px) {
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
