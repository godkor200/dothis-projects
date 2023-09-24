import { useEffect } from 'react';
import styled from 'styled-components';

import { BackgroundDefault, MainDefault, theme } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: #18181b;
  height: 100px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 60px;
  }
`;

export const Main = styled(MainDefault)`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
  }
`;

export const Bar = styled.nav`
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;

  @media (max-width: ${theme.breakpoints.mobile}) {
  }
`;

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  button {
    width: 160px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    font-size: 20px;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 60px;
  padding: 20px 100px;
  border-radius: 50px;
  border: 1px solid black;
  border-color: white;
  font-size: 22px;
  color: white;
  gap: 8px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;
