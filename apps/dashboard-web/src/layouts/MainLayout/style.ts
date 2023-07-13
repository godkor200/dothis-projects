import { theme } from '@dothis/theme/dashboard';
import styled from 'styled-components';
import { css } from 'styled-components';

// SideBar.tsx
export const IconBox = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;

  background-color: white;
  box-shadow: 0px 0px 0px 1px ${theme.colors.grey10};
`;

export const SideText = styled.span`
  padding-top: 0.75rem;
  padding-left: 1.25rem;

  color: ${theme.colors.grey30};

  visibility: hidden;
  opacity: 0;

  white-space: nowrap;
`;

export const IconWrapper = styled.div`
  display: flex;

  width: 3.125rem;
  height: 3.125rem;

  &:hover {
    padding: 0.75rem;
    border-radius: 0.5rem;

    background-color: ${theme.colors.primary10};
    box-shadow: 0px 0px 0px 1px ${theme.colors.grey10};
    transition: none;

    ${IconBox} {
      padding: 0;
      border-radius: 0;

      background-color: ${theme.colors.primary10};

      box-shadow: 0 0 0 0;
      transition: none;
    }
    ${SideText} {
      padding-top: 0;
      padding-left: 2rem;
      /* IconBox padding이 없어지다보니 rem값을 추가해주었다. */
      transition: none;
    }
  }
`;

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 7.5rem;

  position: fixed;

  width: 6rem;
  height: 100vh;

  padding: 1.5rem;
  border-right: 1px solid ${theme.colors.grey20};

  box-sizing: border-box;

  background-color: white;

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

export const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
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

export const ResetButton = styled.button`
  padding: 0.5rem 1.25rem;
  border: 1px solid ${theme.colors.grey40};
  border-radius: 0.5rem;
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

// GNB.tsx

export const GNBContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;
  height: 5.5rem;

  padding: 1.25rem;

  border-bottom: 1px solid ${theme.colors.grey10};

  box-sizing: border-box;
`;

export const SearchInputWrapper = styled.div`
  position: relative;

  flex-grow: 1;
  max-width: 27.5rem;
`;

export const SearchInput = styled.input`
  width: 100%;

  border: 2px solid;
  border-radius: 0.5rem;
  border-color: ${theme.colors.grey10};
  padding: 0.75rem 3.5rem 0.75rem 1rem;
  box-sizing: border-box;

  background-color: ${theme.colors.grey00};

  font-size: 1rem;

  outline: none;

  transition: all 0.5s;

  /* &::-webkit-search-cancel-button {
    display: none;
  } */

  &:focus {
    border-color: ${theme.colors.primary30};
  }

  &::placeholder {
    font-size: 1rem;
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;

  transform: translate(0, -50%);
`;

export const UnknownIconWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: 0.75rem;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.primary20};
  border-radius: 0.5rem;

  background-color: ${theme.colors.primary20};
`;

export const UserGNBWrapper = styled.div`
  display: flex;
  gap: 0.75rem;

  position: absolute;
  right: 3rem;

  @media screen and (max-width: 1200px) {
    gap: 0.25rem;
  }
`;

export const UserGNBIconWrapper = styled.div`
  padding: 0.75rem;

  border-radius: 0.5rem;

  &:hover {
    background-color: ${theme.colors.grey10};
  }
`;

// Footer.tsx
export const FooterLayout = styled.footer`
  padding: 6.25rem 3rem 6.25rem 9.375rem;
  border-top: 1px solid #d4d4d8;
`;

export const LinkContainer = styled.h2`
  display: flex;
  justify-content: end;
  align-items: center;

  margin-bottom: 2.5rem;
`;

export const LogoWrapper = styled.div`
  margin-right: auto;
`;

export const AboutWrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  font-size: 1.125rem;
  font-weight: 800;
`;

export const Text = styled.p`
  margin-bottom: 1.25rem;

  font-size: 0.875rem;
  color: #71717a;
`;

export const Copyright = styled.span`
  font-size: 0.75rem;
  color: #a1a1aa;
`;
