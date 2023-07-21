'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from 'public/aseets/svg/Landing/search.svg';

import { CONTENT, PRICING } from '@/constants/route';

import {
  Background,
  Button,
  Buttons,
  Description,
  ImageBox,
  Main,
  Texts,
  Title,
} from './style';
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
          <Title>
            어떤 영상을 찍어야 <br /> 조회수가 잘 나올까?
          </Title>
          <Description>
            <span>콘텐츠 기획부터 키워드 추천, 트렌드 분석까지 </span>
            <span>바로 지금 Do this 하세요</span>
          </Description>
          <Buttons>
            <Button onClick={() => router.push(CONTENT)}>
              <Image
                src={'/images/landing/logo_small.png'}
                alt={'logo_small'}
                width={30}
                height={30}
              />
              <p>무료 체험하기</p>
            </Button>
            <Button
              onClick={() => {
                router.push(PRICING);
              }}
            >
              <Search width={30} height={30} />
              <p>요금제 알아보기</p>
            </Button>
          </Buttons>
        </Texts>
      </Main>
    </Background>
  );
}
