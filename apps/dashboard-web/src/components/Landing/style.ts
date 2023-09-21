import styled from 'styled-components';

export const Layout = styled.div`
  width: 100%;
`;

export const BackgroundDefault = styled.div`
  width: 100%;
  height: 100%;
  word-break: keep-all;
  display: flex;
  justify-content: center;
  align-items: center;
  scroll-snap-align: start;
  padding: 50px 0px;
  position: relative;
`;

export const MainDefault = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    font-size: 44px;
    font-weight: bolder;
  }
  h3 {
    font-size: 36px;
    font-weight: bolder;
  }
`;

export const CategroiesContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 52px;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const Category = styled.button<{ select: number }>`
  font-size: 20px;
  color: ${(props) => (props.select ? 'black' : 'rgba(161, 161, 170, 1)')};

  @media (max-height: 768px) {
    font-size: 0;
    opacity: 0;
    display: none;
  }
`;

export const MoreButton = styled.button`
  width: 140px;
  height: 54px;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 20px;
  margin-top: 60px;

  @media (max-width: 800px) {
    margin: 0 auto;
    margin-top: 20px;
  }

  @media (max-width: 576px) {
    font-size: 16px;
    padding: 12px 16px;
  }
`;
