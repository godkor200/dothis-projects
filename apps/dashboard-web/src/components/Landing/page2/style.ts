import styled from 'styled-components';
<<<<<<< HEAD

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: rgba(24, 24, 27, 1);
  color: #ffffff;
  padding: 120px 0px;

  @media (max-width: 800px) {
    padding: 70px 0px;
  }
=======
import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  height: 800px;
  background-color: rgba(24, 24, 27, 1);
  color: white;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;

export const Main = styled(MainDefault)`
  margin: 50px;
<<<<<<< HEAD
  flex-direction: column;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 30px 0px;
    margin: 16px;
=======
  flex-direction: row;
  justify-content: center;

  @media (max-width: 800px) {
    display: block;
    height: auto;
    padding: 30px 0px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  }
`;

export const ImageBox = styled.div`
  width: 680px;
<<<<<<< HEAD
  aspect-ratio: 68/56;

  @media (max-width: 1400px) {
    width: 70%;
  }

  @media (max-width: 576px) {
=======

  aspect-ratio: 68/56;
  @media (max-width: 900px) {
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
    width: 80%;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
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

  @media (max-width: 1280px) {
    font-size: 28px;
  }

  @media (max-width: 800px) {
    margin-top: 50px;
    text-align: center;
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
=======
  margin-left: 196px;
  gap: 40px;
  padding-right: 101px;

  @media (max-width: 1280px) {
    margin-left: 80px;
  }
  button {
    width: 140px;
    height: 54px;
    border-radisu: 4px;
    border: 1px solid white;
    font-size: 20px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  }
`;
