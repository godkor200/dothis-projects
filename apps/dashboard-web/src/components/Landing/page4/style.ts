import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
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

export const Img = styled.img`
  margin-top: 40px;
  width: 1006px;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1280px) {
    width: 80%;
  }
`;
