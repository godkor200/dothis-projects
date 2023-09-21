import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  padding-top: 100px;
  padding-bottom: 60px;

  @media (max-height: 900px) {
    padding: 70px 16px 0 16px;
  }
`;

export const Main = styled(MainDefault)`
  p {
    margin-top: 20px;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  padding: 0 52px;
  text-align: center;

  span {
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 576px) {
    font-size: 28px;
  }
`;

export const Description = styled.p`
  font-size: 24px;
  padding: 0 100px;
  white-space: nowrap;

  @media (max-width: 1280px) {
    font-size: 20px;
    text-align: center;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    padding: 0 70px;
    margin-bottom: 48px;
  }
`;

export const ImageBox = styled.div`
  width: 900px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  aspect-ratio: 90/48;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
