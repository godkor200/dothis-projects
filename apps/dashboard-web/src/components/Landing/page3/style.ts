import styled from 'styled-components';

import {
  BackgroundDefault,
  DescriptionDefault,
  MainDefault,
  theme,
  TitleDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
  padding-top: 100px;
  padding-bottom: 60px;

  @media (max-height: 900px) {
    padding: 70px 16px 0 16px;
  }
`;

export const Main = styled(MainDefault)`
  gap: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    margin-top: 20px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    padding: 30px 0px;
    margin: 16px;
  }
`;

export const Img = styled.img`
  margin-top: 60px;
  width: 1132px;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1280px) {
    width: 95%;
  }
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
    width: 280px;
  }
`;
