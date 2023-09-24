import styled from 'styled-components';

import {
  BackgroundDefault,
  DescriptionDefault,
  MainDefault,
  MoreButton as MoreButtonDefault,
  theme,
  TitleDefault,
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


export const Img = styled.img`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 943px;
  height: auto;

  @media (max-width: 1280px) {
    width: 80%;
  }
`;

export const Title = styled(TitleDefault)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    font-size: 26px;
    margin-bottom: 12px;
    padding: 0 14px;
    width: 300px;
  }
`;

export const Description = styled(DescriptionDefault)`
  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 300px;
  }
`;
