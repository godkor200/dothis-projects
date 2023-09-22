import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: white;

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

export const Container = styled.div`
  aspect-ratio: 110/46;
  position: relative;
  margin: 0px 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;

  @media (max-width: 1280px) {
    width: 90%;
  }

  /* @media (max-width: 576px) {
    display: none;
  } */
`;

export const ImageContainer = styled.div`
  position: relative;
  @media (max-width: 768px) {
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;

  @media (max-width: 576px) {
    gap: 16px;
    margin: 30px 16px 0 16px;
    white-space: nowrap;
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid black;
  gap: 8px;
  font-size: 20px;
  font-weight: bold;
  padding: 16px 24px;

  @media (max-width: 576px) {
    font-size: 16px;
    padding: 12px 16px;

    img,
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainTitle = styled.h1`
  display: flex;
  font-size: 70px;
  font-weight: 700;
  padding: 0 52px;
  text-align: center;

  @media (max-width: 576px) {
    display: block;
  }
`;

export const SlideIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

export const SlideText = styled.h1`
  display: flex;
  font-size: 22px;
  text-align: center;
  font-weight: 700;
`;

export const SlideIconContainer = styled.div`
  width: 1920px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 120px;
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
