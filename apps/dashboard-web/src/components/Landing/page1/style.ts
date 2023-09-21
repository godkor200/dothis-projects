import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: white;
  padding-bottom: 143px;

  @media (max-width: 576px) {
    padding-bottom: 60px;
  }
`;

export const Main = styled(MainDefault)`
  margin-top: 240px;

  @media (max-width: 576px) {
    margin-top: 140px;
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

export const Title = styled.h1`
  display: flex;
  font-size: 32px;
  font-weight: 700;
  padding: 0 52px;
  text-align: center;

  @media (max-width: 576px) {
    display: block;
  }
`;

export const Description = styled.p`
  padding: 0 36px;
  margin-top: 30px;
  font-size: 24px;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 576px) {
    white-space: nowrap;
    font-size: 16px;
    text-align: center;
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

  @media (max-width: 576px) {
    display: none;
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

export const Circle = styled.div`
  width: 100px;
  height: 100px;
  background-color: black;
  border-radius: 50px;
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 576px) {
    width: 1rem;
    height: 1rem;
  }
`;

export const CircleText = styled.p`
  padding: 0 18px;
  font-size: 16px;
  color: #FFFFFF;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 576px) {
    white-space: nowrap;
    font-size: 12px;
    text-align: center;
  }
`;

export const CircleBox = styled.div`
  width: 1100px;
  position: relative;
  margin: 0px 90px;
  display: flex;
  flex-direction: row;

  @media (max-width: 1280px) {
    width: 90%;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;