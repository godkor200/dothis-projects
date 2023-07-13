import styled, { css, keyframes } from 'styled-components';

// GoogleBtn.tsx
export const GoogleLink = styled.a`
  display: block;
  width: 100%;
  margin-top: 3.75rem;
`;

export const Container = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 1rem 0;

  border: 1px solid #f4f4f5;
  border-radius: 0.5rem;

  text-align: center;
`;

export const Button = styled.button`
  display: inline-flex;

  gap: 0.7rem;
`;

export const Text = styled.p`
  font-weight: 700;
`;

// Keywords.tsx
export const FADE_IN = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const TagList = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  margin-bottom: 4rem;
`;

export const TagItem = styled.li<{ chosen: boolean | undefined }>`
  height: 2rem;
  padding: 0 0.75rem;

  border-radius: 0.5rem;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 0.875rem;
  cursor: pointer;

  animation: 0.25s ${FADE_IN} cubic-bezier(0.165, 0.84, 0.44, 1);
  transition: all 0.25s cubic-bezier(0.165, 0.84, 0.44, 1);

  box-shadow: inset 0 0 0 2px #fafafa;

  ${({ style, chosen }) =>
    chosen
      ? css`
          font-weight: bold;

          background-color: #fef7f8;
          box-shadow: inset 0 0 0 2px #fde7eb;
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
export const LoginKeywordButton = styled.button<{ disabledBtn: number }>`
  display: block;

  width: 100%;

  padding: 1rem;

  border-radius: 0.5rem;

  background-color: #fde7eb;
  color: #f7b4c0;

  ${({ style, disabledBtn }) =>
    disabledBtn &&
    css`
      background-color: #ff647d;
      color: white;
    `}
`;
