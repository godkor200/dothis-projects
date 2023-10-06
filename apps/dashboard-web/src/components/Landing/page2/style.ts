import styled from 'styled-components';

import {
  BackgroundDefault,
  DescriptionDefault,
  MainDefault,
  theme,
  TitleDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
  padding: 120px 0px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 70px 0px;
  }
`;

export const Main = styled(MainDefault)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 80px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 30px 0px;
    margin: 8px;
  }
`;

export const ImageBackground = styled.div`
  position: absolute;
  background-color: #ffb4c9;
  height: 362px;
  width: 100%;
  left: 0%;

  @media (max-width: 1280px) {
    height: 30%;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    height: 15%;
  }
`;

export const ImageBackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
`;

export const ImageContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${theme.breakpoints.mobile}) {
  }
`;

export const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const ImgMock = styled.img`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1069px;
  height: auto;

  @media (max-width: 1280px) {
    width: 85%;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 90%;
  flex-wrap: wrap;

  /* @media (max-width: 1280px) {
    margin-left: 40px;
    padding-right: 40px;
  } */

  @media (max-width: 900px) {
    padding-right: 0;
  }

  @media (max-width: 800px) {
    margin-left: 0;
  }

  button {
    width: 140px;
    height: 54px;
    border-radius: 4px;
    border: 1px solid white;
    font-size: 20px;

    @media (max-width: 800px) {
      margin: 0 auto;
    }

    @media (max-width: 576px) {
      font-size: 16px;
      padding: 12px 16px;
    }
  }
`;

export const Title = styled(TitleDefault)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 26px;
    margin-bottom: 12px;
    padding: 0px 0px;
    width: 220px;
  }
`;

export const Description = styled(DescriptionDefault)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 240px;
  }
`;
