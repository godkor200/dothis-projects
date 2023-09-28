import styled, { keyframes } from 'styled-components';

import {
  BackgroundDefault,
  DescriptionDefault,
  MainDefault,
  theme,
  TitleDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: white;

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding-bottom: 60px;
  }
`;

export const Main = styled(MainDefault)`
  margin-top: 40px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 140px;
  }
`;

export const Container = styled.div`
  position: relative;
  margin: 0px 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  /* @media (max-width: ${theme.breakpoints.desktop_s}) {
    width: 90%;
  } */

  /* @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  } */
`;
export const ImgAutomatic = styled.img`
  position: relative;
  width: 1130px;
  height: auto;

  @media (max-width: ${theme.breakpoints.desktop_s}) {
    width: 90%;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin-top: 60px;
  }
`;

export const ImgMockBackground = styled.img`
  position: relatave;
  width: 1130px;
  height: auto;
  margin: 100px 0px 200px 0px;

  @media (max-width: ${theme.breakpoints.desktop_s}) {
    width: 90%;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 80px 0px 160px 0px;
    width: 100%;
  }
`;

export const ImgMock = styled.img`
  position: absolute;
  width: 690px;
  height: auto;
  margin: 100px 0px 200px 0px;

  @media (max-width: ${theme.breakpoints.desktop_s}) {
    width: 55%;
  }
  @media (max-width: ${theme.breakpoints.mobile}) {
    margin: 80px 0px 160px 0px;
    width: 440px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 40px;
  margin: 60px 0px;

  @media (max-width: ${theme.breakpoints.mobile}) {
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

  @media (max-width: ${theme.breakpoints.mobile}) {
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
  gap: 40px;
`;

export const MainTitle = styled.h1`
  display: flex;
  font-size: 70px;
  font-weight: 700;
  padding: 0 52px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    display: block;
    font-size: 40px;
    padding: 0 25px;
}
`;

export const infiniteSlide = keyframes`
  0%, 100% {
      transform: translateX(0%);
  }
  100% {
      transform: translateX(-1800%); // icon이 9개라 -200% * 9
  }
`;

export const SlideIcon = styled.div`
  width: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  flex-wrap: nowrap;
  animation: ${infiniteSlide} 10s linear infinite normal none running;

  &::before {
    content: '';
    display: block;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
  }
`;

export const SlideText = styled.h1`
  display: flex;
  font-size: 22px;
  text-align: center;
  flex-direction: column;
  font-weight: 700;
  width: 160px;
`;

export const SlideIconContainer = styled.div`
  width: 200%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 160px;
  padding-top: 80px;
  list-style: none;
  overflow: hidden;
  flex-wrap: nowrap;
`;

export const Title = styled(TitleDefault)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 26px;
    margin-bottom: 12px;
    padding: 0 14px;
    width: 360px;
  }
`;

export const Description = styled(DescriptionDefault)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 300px;
  }
`;
