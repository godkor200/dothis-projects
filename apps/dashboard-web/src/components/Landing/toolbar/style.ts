import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: #18181b;
  height: 100px;

  @media (max-width: 576px) {
    padding-bottom: 60px;
  }
`;

export const Main = styled(MainDefault)`
  margin-top: 100px;

  @media (max-width: 576px) {
    margin-top: 140px;
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
  border-radius: 20px;
  border: 1px solid black;
  font-size: 22px;
  color: white;
  margin-top: 60px;
  gap: 8px;

  @media (max-width: 576px) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;
