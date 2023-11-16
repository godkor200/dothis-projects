import styled, { css } from 'styled-components';

// KeywordSlide.tsx
export const KeywordTapContiner = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;
  justify-content: center;

  max-width: 658px;

  margin: 0 auto 1.5rem auto;

  background-color: white;
  transition: all 0.5s ease;
  white-space: nowrap;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 0.675rem;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowLeftButton = styled.button`
  position: relative;

  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey500};
  border-radius: 0.5rem;
`;

export const ArrowRightButton = styled.button`
  position: relative;

  /* 오른쪽 정렬이 필요 (Keyword List가 적을 때) */
  /* margin: 0 0 0 auto; */
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey500};
  border-radius: 0.5rem;
`;

// Keyword
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
    $active
      ? css`
          box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.colors.primary500}
            inset;
          background-color: ${theme.colors.primary50};
          color: ${theme.colors.primary500};
        `
      : css`
          & path {
            fill: ${theme.colors.grey200};
            stroke: ${theme.colors.grey500};
          }
        `}
`;
