import styled from 'styled-components';

import {
  BackgroundDefault,
  MainDefault,
  MoreButton as MoreButtonDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: rgba(34, 34, 34, 1);
  color: white;
  padding: 120px 0px;

  @media (max-width: 768px) {
    padding-top: 0;
  }
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
  }
`;

export const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
