import Image from 'next/image';
import { useState } from 'react';

import RevealWrapper from '@/components/Landing/RevealWrapper';

import { Category, CategroiesContainer, MoreButton } from '../style';
import { Background, Description, Img, Main, Title } from './style';

export default function Page3_abtest() {
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
          조회수 이끄는 아이템 추천 <br /> 클릭 한 번이면 충분해요.
        </Title>
        <Description>
          클릭 한 번으로 두디스가 추천하는 아이템을 한 눈에 살펴보세요.
        </Description>
        <RevealWrapper>
          <Img
            src={'/images/landing/svg/Landing_Section3_Mockup_Group_abtest.svg'}
            alt={''}
          />
        </RevealWrapper>

        {/* <MoreButton
          onClick={() => {
            alert('준비중입니다');
          }}
        >
          더 알아보기
        </MoreButton> */}
      </Main>
    </Background>
  );
}
