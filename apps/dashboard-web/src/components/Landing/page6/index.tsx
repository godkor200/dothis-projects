import Image from 'next/image';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 700px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Main = styled.main`
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 36px;
    font-weight: bolder;
  }

  button {
    margin-top: 40px;
    border: 1px solid black;
    border-radius: 4px;
    gap: 8px;
    width: 195px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-sisz: 20px;
  }
`;

const ImageBox = styled.div`
  position: relative;
  left: -50px;
`;

const Texts = styled.div`
  position: relative;
  top: -150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Page6() {
  return (
    <Background>
      <Main>
        <ImageBox>
          <Image
            src={'/images/landing/page6.png'}
            alt={''}
            width={500}
            height={500}
          />
        </ImageBox>
        <Texts>
          <h3>영상 기획, 오랜 시간 고민하지 말고 두-디스</h3>
          <button>
            <Image
              src={'/images/landing/logo_small.png'}
              alt={''}
              width={30}
              height={30}
            />
            <p>무료 체험하기</p>
          </button>
        </Texts>
      </Main>
    </Background>
  );
}
