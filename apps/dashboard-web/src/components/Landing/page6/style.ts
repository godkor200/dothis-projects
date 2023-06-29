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
    width: 195px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
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
