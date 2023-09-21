import styled from 'styled-components';
<<<<<<< HEAD

=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
import {
  BackgroundDefault,
  MainDefault,
  MoreButton as MoreButtonDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
<<<<<<< HEAD
  background-color: rgba(34, 34, 34, 1);
  color: white;
  padding: 120px 0px;

  @media (max-width: 768px) {
    padding-top: 0;
  }
=======
  height: 1901px;
  background-color: rgba(34, 34, 34, 1);
  color: white;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;

export const Main = styled(MainDefault)`
  margin-top: 120px;
`;
<<<<<<< HEAD

=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
export const MoreButton = styled(MoreButtonDefault)`
  border: 1px solid white;
  background-color: inherit;
  color: white;
  margin-top: 40px;
`;

export const Container = styled.div`
  border-radius: 30px;
  background-color: rgba(45, 45, 45, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 80px 50px;
  padding-top: 80px;
<<<<<<< HEAD

  @media (max-width: 768px) {
    padding: 38px;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  gap: 40px;
  margin: 50px;

  @media (max-width: 1480px) {
    flex-direction: column;
  }

  @media (max-width: 576px) {
    margin: 26px;
  }
`;

export const ContainerA = styled(Container)``;

export const ContainerB = styled(Container)`
  padding-bottom: 80px;
  margin: 0 50px;

  @media (max-width: 576px) {
    margin: 0 26px;
  }
=======
`;

export const ContainerA = styled(Container)`
  height: 766px;
`;

export const ContainerB = styled(Container)`
  height: 645px;
  padding-bottom: 80px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;

export const Texts = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;
  margin-bottom: 67px;

  h3 {
    font-size: 30px;
    font-weight: bolder;
  }

  p {
    color: rgba(161, 161, 170, 1);
    font-size: 20px;
  }
<<<<<<< HEAD

  @media (max-width: 1480px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
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

export const Containers = styled.div`
  @media (max-width: 768px) {
=======
`;

export const Containers = styled.div`
  display: grid;
  grid-template-rows: 766px 645px;
  grid-template-columns: 1fr 1fr;
  margin: 50px;
  gap: 40px;

  div:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  }
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
