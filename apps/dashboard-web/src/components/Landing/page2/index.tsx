import Image from 'next/image';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 80vh;
  background-color: rgba(24, 24, 27, 1);
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  margin-left: 196px;
  gap: 40px;

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

export default function Page2() {
  return (
    <Background>
      <Image
        src={'/images/landing/page2.png'}
        alt={''}
        width={680}
        height={560}
      />
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
