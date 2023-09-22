import styled from 'styled-components';
import {
  BackgroundDefault,
  MainDefault,
  MoreButton as MoreButtonDefault,
} from '../style';

export const Background = styled(BackgroundDefault)`
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


export const ImageBox = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
