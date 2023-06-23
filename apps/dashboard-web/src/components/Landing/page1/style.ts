import styled from 'styled-components';
import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: white;
`;

export const Main = styled(MainDefault)`
  margin-top: 240px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid black;
    gap: 8px;
    font-size: 20px;
    font-weight: bolder;
    padding: 16px 24px;
  }
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 64px;
    font-weight: bolder;
  }
  h3 {
    margin-top: 30px;
    font-size: 24px;
  }
`;

export const ImageBox = styled.div`
  width: 1100px;
  aspect-ratio: 110/46;
  position: relative;
  margin: 0px 90px;

  @media (max-width: 1280px) {
    width: 90%;
  }
`;

export const Bar = styled.nav`
  position: absolute;
  width: 100%;
  top: 0;
  padding: 36px 50px;
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
