'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Search from '@/assets/svg/Landing/search.svg';
import { CONTENT, PRICING } from '@/constants/route';

import { Background, Buttons, ImageBox, Main, Texts } from './style';
import Topbar from './topbar';

export default function Page1() {
  const router = useRouter();

  return (
    <Background>
      <Topbar />
      <Main>
        <ImageBox>
          <Image
            src="/images/landing/page1.png"
            width={0}
            height={0}
            sizes="100%"
            fill
            alt={'page1 image'}
          />
        </ImageBox>
        <Texts>
          <h3>
            콘텐츠 기획부터 키워드 추천, 트렌드 분석까지 바로 지금 Do this
            하세요
          </h3>
          <Buttons>
            <button onClick={() => router.push(CONTENT)}>
              <Image
                src={'/images/landing/logo_small.png'}
                alt={'logo_small'}
                width={30}
                height={30}
              />
              <p>무료 체험하기</p>
            </button>
            <button
              onClick={() => {
                router.push(PRICING);
              }}
            >
              <Search width={30} height={30} />
              <p>요금제 알아보기</p>
            </button>
          </Buttons>
        </Texts>
      </Main>
    </Background>
  );
}
