import styled from 'styled-components';

import {
  BackgroundDefault,
  DescriptionDefault,
  MainDefault,
  theme,
  TitleDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
  @media (max-height: 700px) {
    height: 700px;
  }
`;

export const Main = styled(MainDefault)`
  margin-top: 60px;
  justify-content: center;
  gap: 40px;

  button {
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 4px;
    gap: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    padding: 16px 24px;

    @media (max-width: 576px) {
      img {
        width: 16px;
        height: 16px;
      }

      font-size: 16px;
    }
  }
`;

export const ImageBox = styled.div`
  position: relative;
  left: -50px;
`;

export const Texts = styled.div`
  position: relative;
  top: -150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled(TitleDefault)`
  font-size: 36px;
  font-weight: 700;
  padding: 0 52px;
  text-align: center;

  span {
    white-space: nowrap;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
  }

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
