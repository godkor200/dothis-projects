import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 900px;
  background-color: rgba(249, 249, 249, 1);
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
`;

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 36px;
    font-weight: bolder;
  }
  p {
    margin-top: 20px;
    font-size: 20px;
  }
`;

const CategroiesContainer = styled.nav`
  margin-top: 40px;
  margin-bottom: 52px;
  display: flex;
  gap: 40px;
`;

const Category = styled.button<{ select: number }>`
  font-size: 20px;
  color: ${(props) => (props.select ? 'black' : 'rgba(161, 161, 170, 1)')};
`;

const MoreButton = styled.button`
  width: 140px;
  height: 54px;
  border-radisu: 4px;
  border: 1px solid black;
  font-size: 20px;

  margin-top: 60px;
`;

const ImageBox = styled.div`
  width: 700px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  aspect-ratio: 7/5;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

export default function Page4() {
  const [state, setState] = useState<number>(0);
  const titles = ['채널별 연관 콘텐츠', '시청자 반응', '콘텐츠 요약'];

  return (
    <Background>
      <Main>
        <h3>📊 한 눈에 보이는 트렌드</h3>
        <CategroiesContainer>
          {titles.map((value: string, key: number) => {
            return (
              <Category
                key={`page3_menu_${key}`}
                onClick={() => {
                  setState(key);
                }}
                select={state === key ? 1 : 0}
              >
                {value}
              </Category>
            );
          })}
        </CategroiesContainer>
        <ImageBox>
          <Image
            src={`/images/landing/page4_${state + 1}.png`}
            alt={`${state} image`}
            width={0}
            height={0}
            sizes="100%"
            fill
          />
        </ImageBox>
        <MoreButton
          onClick={() => {
            console.log('move');
          }}
        >
          더 알아보기
        </MoreButton>
      </Main>
    </Background>
  );
}
