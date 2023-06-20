import styled from 'styled-components';
import {
  BackgroundDefault,
  MainDefault,
  MoreButton as MoreButtonDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
  height: 1901px;
  background-color: rgba(34, 34, 34, 1);
  color: white;
`;

export const Main = styled(MainDefault)`
  margin-top: 120px;
`;
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
`;

export const ContainerA = styled(Container)`
  height: 766px;
`;

export const ContainerB = styled(Container)`
  height: 645px;
  padding-bottom: 80px;
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
  }
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
