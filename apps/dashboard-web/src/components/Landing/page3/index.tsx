import Image from 'next/image';
import { useState } from 'react';

import {
  Category,
  CategroiesContainer,
  Description,
  MoreButton,
  Title,
} from '../style';
import { Background, ImageBox, Main } from './style';

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
        <Title>다른 사람들은 어떻게 만들지?</Title>
        <Description>
          선택한 아이템과 관련된 다른 콘텐츠를 한 눈에 요약해 드려요.
          <br /> 요약 내용을 참고해 아이디어를 얻어보세요.
        </Description>
        <ImageBox>
          <Image
            src={'/images/landing/svg/Landing_Section3_Mockup_Group.svg'}
            alt={''}
            width={0}
            height={0}
            sizes="100vm"
            style={{ width: '80%', height: 'auto' }}
          />
        </ImageBox>

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
