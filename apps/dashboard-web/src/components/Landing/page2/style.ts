import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: white;
  background-color: rgba(24, 24, 27, 1);
  color: #ffffff;
  padding: 120px 0px;

  @media (max-width: 800px) {
    padding: 70px 0px;
  }
`;

export const Main = styled(MainDefault)`
  margin: 50px;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 30px 0px;
    margin: 16px;
  }
`;

export const ImageBox = styled.div`
  width: 680px;
  aspect-ratio: 68/56;

  @media (max-width: 1400px) {
    width: 70%;
  }

  @media (max-width: 576px) {
    width: 80%;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-left: 196px;
  padding-right: 100px;

  @media (max-width: 1280px) {
    margin-left: 40px;
    padding-right: 40px;
  }

  @media (max-width: 900px) {
    padding-right: 0;
  }

  @media (max-width: 800px) {
    margin-left: 0;
  }

  @media (max-width: 576px) {
    margin-left: 14px;
    padding-right: 14px;
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

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  text-align: center;

  @media (max-width: 1280px) {
    font-size: 28px;
  }

  @media (max-width: 800px) {
    margin-top: 50px;
  }
`;

export const Description = styled.p`
  font-size: 24px;
  white-space: nowrap;

  @media (max-width: 1280px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
    font-size: 16px;
    text-align: center;
  }
`;
