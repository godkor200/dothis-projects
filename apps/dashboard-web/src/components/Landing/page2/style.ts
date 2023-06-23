import styled from 'styled-components';
import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: rgba(24, 24, 27, 1);
  color: white;
`;

export const Main = styled(MainDefault)`
  margin: 50px;
  flex-direction: row;
  justify-content: center;

  @media (max-width: 800px) {
    display: block;
    height: auto;
    padding: 30px 0px;
  }
`;

export const ImageBox = styled.div`
  width: 680px;

  aspect-ratio: 68/56;
  @media (max-width: 900px) {
    width: 80%;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 196px;
  gap: 40px;
  padding-right: 101px;

  @media (max-width: 1280px) {
    margin-left: 80px;
  }
  button {
    width: 140px;
    height: 54px;
    border-radius: 4px;
    border: 1px solid white;
    font-size: 20px;
  }
`;
