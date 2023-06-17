import Image from 'next/image';
import styled from 'styled-components';

import Topbar from './topbar';

const Background = styled.div`
  width: 100vw;
  height: 1080px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  margin-top: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
  gap: 40px;
  margin-top: 30px;

  button {
    width: 195px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1px solid black;
    gap: 8px;
    font-size: 20px;
    font-weight: bolder;
  }
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 64px;
    font-weight: bolder;
  }
  h3 {
    margin-top: 30px;
    font-size: 24px;
  }
`;

const ImgBox = styled.div`
  @media (max-width: 1280px) {
    width: 1180px;
    height: 490px;
  }
`;

export default function Page1() {
  return (
    <Background>
      <Topbar />
      <Main>
        <ImgBox>
          <Image
            src="/images/landing/page1.png"
            width={1285}
            height={358}
            sizes="(max-width:1285px) 100%"
            alt={'page1 image'}
          />
        </ImgBox>
        <Texts>
          <h3>
            콘텐츠 기획부터 키워드 추천, 트렌드 분석까지 바로 지금 Do this
            하세요
          </h3>
          <Buttons>
            <button>
              <Image
                src={'/images/landing/logo_small.png'}
                alt={'logo_small'}
                width={30}
                height={30}
              />
              <p>무료 체험하기</p>
            </button>
            <button>
              <Image src={'./search.svg'} alt={''} width={30} height={30} />
              <p>요금제 알아보기</p>
            </button>
          </Buttons>
        </Texts>
      </Main>
    </Background>
  );
}
