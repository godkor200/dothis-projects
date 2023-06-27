import styled from 'styled-components';
export const Layout = styled.div`
  width: 100%;
  height: 100vh;
  scroll-snap-type: y mandatory;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

export const BackgroundDefault = styled.div`
  width: 100%;
  height: 110vh;
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
  p {
    font-size: 20px;
  }
`;

export const CategroiesContainer = styled.nav`
  margin-top: 40px;
  margin-bottom: 52px;
  display: flex;
  gap: 40px;
`;

export const Category = styled.button<{ select: number }>`
  font-size: 20px;
  color: ${(props) => (props.select ? 'black' : 'rgba(161, 161, 170, 1)')};
`;

export const MoreButton = styled.button`
  width: 140px;
  height: 54px;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 20px;

  margin-top: 60px;
`;
