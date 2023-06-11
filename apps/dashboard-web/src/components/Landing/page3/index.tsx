import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100vw;
  height: 90vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
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

  margin-top: 40px;
`;

const ImageBox = styled.div`
  height: 431px;
`;

export default function Page3() {
  const [state, setState] = useState<number>(1);
  const titles = [
    '내 관심사',
    '연관 소재',
    '경쟁 강도',
    '조회수 예측',
    '구독자 구간',
  ];

  return (
    <Background>
      <Main>
        <h2>🔎 내 관심사 그대로 맞춤 키워드 분석</h2>
        <p>
          <b>내 채널의 관심사</b>부터 시작해 앞으로 다룰만한 콘텐츠 소재의{' '}
          <b>조회수 예측</b>까지 알 수 있어요
        </p>
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
            src={`/images/landing/page3_${state + 1}.png`}
            alt={`${state} image`}
            width={700}
            height={431}
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
