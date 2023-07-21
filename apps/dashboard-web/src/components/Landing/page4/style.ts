import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: rgba(249, 249, 249, 1);

  padding-top: 100px;
  padding-bottom: 60px;

  @media (max-height: 900px) {
    height: 900px;
  }

  @media (max-width: 576px) {
    padding-top: 70px;
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
  padding: 0 38px;
  text-align: center;
  white-space: nowrap;

  @media (max-width: 576px) {
    font-size: 28px;
    margin-bottom: 12px;
  }
`;

export const ImageBox = styled.div`
  width: 700px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  aspect-ratio: 7/5;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
