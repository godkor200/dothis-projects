import Image from 'next/image';
import { useState } from 'react';

import { Category, CategroiesContainer, MoreButton } from '../style';
import { Background, Description, ImageBox, Main, Title } from './style';

export default function Page3() {
  const [state, setState] = useState<number>(0);
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
        <Title>
          <span>🔎 내 관심사 그대로 </span>
          <span>맞춤 키워드 분석</span>
        </Title>
        <Description>
          <span>
            <b>내 채널의 관심사</b>부터 시작해 앞으로 다룰만한
          </span>
          <span>
            콘텐츠 소재의 <b>조회수 예측</b>까지 알 수 있어요
          </span>
        </Description>
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
            src={`/images/landing/keyword_0${state + 1}.png`}
            alt={`${state} image`}
            width={0}
            height={0}
            sizes={'100%'}
            fill
          />
        </ImageBox>
        <MoreButton
          onClick={() => {
            alert('준비중입니다');
          }}
        >
          더 알아보기
        </MoreButton>
      </Main>
    </Background>
  );
}
