import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  @media (max-height: 700px) {
    height: 700px;
  }
`;

export const Main = styled(MainDefault)`
  margin-top: 110px;
  justify-content: center;

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
