import styled from 'styled-components';

export const BackgroundDefault = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  width: 100%;
  margin-top: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid black;
    gap: 8px;
    font-size: 20px;
    font-weight: bolder;
    padding: 16px 24px;
  }
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 64px;
    font-weight: bolder;
  }
  h3 {
    margin-top: 30px;
    font-size: 24px;
  }
`;

const ImageBox = styled.div`
  width: 1100px;
  aspect-ratio: 110/46;
  position: relative;
  margin: 0px 90px;

  @media (max-width: 1280px) {
    width: 90%;
  }
`;
