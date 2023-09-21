import styled from 'styled-components';
<<<<<<< HEAD

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  @media (max-height: 700px) {
    height: 700px;
  }
=======
import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  height: 700px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;

export const Main = styled(MainDefault)`
  margin-top: 110px;
  justify-content: center;

  button {
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 4px;
    gap: 8px;
<<<<<<< HEAD
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
=======
    width: 195px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-sisz: 20px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
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
<<<<<<< HEAD

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
=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
