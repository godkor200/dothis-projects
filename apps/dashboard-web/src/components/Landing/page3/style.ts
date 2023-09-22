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

export const ImageBox = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
