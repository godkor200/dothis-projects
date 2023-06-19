import Image from 'next/image';
import styled from 'styled-components';

const Background = styled.div`
  height: 800px;
  background-color: rgba(24, 24, 27, 1);
  color: white;
  word-break: keep-all;

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 800px) {
    display: block;
    height: auto;
    padding: 30px 0px;
  }

  position: relative;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-left: 196px;
  gap: 40px;
  padding-right: 101px;

  @media (max-width: 1280px) {
    margin-left: 80px;
  }

  h3 {
    font-size: 36px;
    font-weight: bolder;
  }
  p {
    font-size: 20px;
  }
  button {
    width: 140px;
    height: 54px;
    border-radisu: 4px;
    border: 1px solid white;
    font-size: 20px;
  }
`;

const ImageBox = styled.div`
  width: 680px;
  padding-left: 50px;

  aspect-ratio: 68/56;
  @media (max-width: 900px) {
    width: 100%;
    padding-right: 50px;
  }
`;

export default function Page2() {
  return (
    <Background>
      <ImageBox>
        <Image
          src={'/images/landing/page2.png'}
          alt={''}
          width={680}
          height={560}
          sizes="100%"
        />
      </ImageBox>
      <Main>
        <h3>
          유튜브 콘텐츠, <br /> 10분만에 기획을 간단하게
        </h3>
        <p>
          조회수 높이는 맞춤형 소재부터 포맷에 따른 <br />
          스토리보드 도구까지 한곳에서 간편하게!
        </p>
        <button>더 알아보기</button>
      </Main>
    </Background>
  );
}
