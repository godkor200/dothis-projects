import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  padding: 120px 0px;

  @media (max-width: 800px) {
    padding: 70px 0px;
  }
`;

export const Main = styled(MainDefault)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 800px) {
    flex-direction: column;
    padding: 30px 0px;
    margin: 16px;
  }
`;

export const ImageBackground = styled.div`
  position: absolute;
  background-color: #ffb4c9;
  height: 30%;
  width: 100%;
`;

export const ImageBackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;

`;

export const ImageContainer = styled.div`
  width: 100%;
  margin: 50px 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
  }
`;

export const ImageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

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
