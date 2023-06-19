import styled from 'styled-components';
import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  height: 800px;
  background-color: rgba(24, 24, 27, 1);
  color: white;

  @media (max-width: 800px) {
    display: block;
    height: auto;
    padding: 30px 0px;
  }
`;

export const Main = styled(MainDefault)`
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
  }
`;

export const ImageBox = styled.div`
  width: 680px;
  padding-left: 50px;

  aspect-ratio: 68/56;
  @media (max-width: 900px) {
    width: 100%;
    padding-right: 50px;
  }
`;
