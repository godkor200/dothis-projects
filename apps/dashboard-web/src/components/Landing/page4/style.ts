import styled from 'styled-components';
import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)`
  background-color: rgba(249, 249, 249, 1);
`;

export const Main = styled(MainDefault)`
  p {
    margin-top: 20px;
  }
`;

export const ImageBox = styled.div`
  width: 700px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  aspect-ratio: 7/5;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
