import styled, { css, keyframes } from 'styled-components';

// Keywords.tsx
export const FADE_IN = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const TagItem = styled.li<{ $chosen: boolean | undefined }>`
  padding: 0.625rem 1.25rem;

  border-radius: 0.5rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  cursor: pointer;

  animation: 0.25s ${FADE_IN} cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  /* box-shadow: inset 0 0 0 2px #fafafa; */

  font-weight: bold;
  color: #71717a;
  background-color: #f4f4f5;

  ${({ style, $chosen, theme }) =>
    $chosen
      ? css`
          background-color: #f0516d;
          color: white;
          /* box-shadow: inset 0 0 0 2px #fde7eb; */
        `
      : css``}
  @media (min-width: 768px) {
    height: 2.25rem;
    font-size: 1rem;
  }
`;

export const StyledCheck = styled.i`
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 22px;
  height: 22px;
  border: 2px solid transparent;

  &::after {
    content: '';
    display: block;
    box-sizing: border-box;
    position: absolute;
    left: 3px;
    top: -1px;
    width: 6px;
    height: 10px;
    border-width: 0 1px 1px 0;
    border-color: #ff647d;
    transform-origin: bottom left;
    transform: rotate(45deg);
  }
`;

// LoginKeyword.tsx
export const LoginKeywordButton = styled.button<{ $disabledBtn: number }>`
  display: block;

  width: 100%;

  padding: 1rem;

  border-radius: 0.5rem;

  background-color: #fde7eb;
  color: #f7b4c0;

  ${({ style, $disabledBtn }) =>
    $disabledBtn &&
    css`
      background-color: #ff647d;
      color: white;
    `}
`;
