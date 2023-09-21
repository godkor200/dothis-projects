import styled from 'styled-components';

<<<<<<< HEAD
export const Layout = styled.div`
  width: 100%;
`;

export const BackgroundDefault = styled.div`
  width: 100%;
  height: 100%;
=======
export const BackgroundDefault = styled.div`
  width: 100%;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  word-break: keep-all;
  display: flex;
  justify-content: center;
  align-items: center;
<<<<<<< HEAD
  scroll-snap-align: start;
  padding: 50px 0px;
=======

>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  position: relative;
`;

export const MainDefault = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
<<<<<<< HEAD

=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  h2 {
    font-size: 44px;
    font-weight: bolder;
  }
<<<<<<< HEAD

=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
  h3 {
    font-size: 36px;
    font-weight: bolder;
  }
<<<<<<< HEAD
`;

export const CategroiesContainer = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 52px;
  gap: 40px;

  @media (max-width: 768px) {
    display: none;
  }
=======
  p {
    font-size: 20px;
  }
`;

export const CategroiesContainer = styled.nav`
  margin-top: 40px;
  margin-bottom: 52px;
  display: flex;
  gap: 40px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;

export const Category = styled.button<{ select: number }>`
  font-size: 20px;
  color: ${(props) => (props.select ? 'black' : 'rgba(161, 161, 170, 1)')};
<<<<<<< HEAD

  @media (max-height: 768px) {
    font-size: 0;
    opacity: 0;
    display: none;
  }
=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;

export const MoreButton = styled.button`
  width: 140px;
  height: 54px;
<<<<<<< HEAD
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
=======
  border-radisu: 4px;
  border: 1px solid black;
  font-size: 20px;

  margin-top: 60px;
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
`;
