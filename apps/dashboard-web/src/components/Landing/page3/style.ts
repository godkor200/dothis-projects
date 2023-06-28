import styled from 'styled-components';

import { BackgroundDefault, MainDefault } from '../style';

export const Background = styled(BackgroundDefault)``;

export const Main = styled(MainDefault)`
  p {
    margin-top: 20px;
  }
`;

export const ImageBox = styled.div`
  width: 900px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  aspect-ratio: 90/48;
  @media (max-width: 900px) {
    width: 100%;
  }
`;
