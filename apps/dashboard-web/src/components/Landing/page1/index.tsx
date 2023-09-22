'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from 'public/aseets/svg/Landing/search.svg';

import { CONTENT, PRICING } from '@/constants/route';

import { Description, Title } from '../style';
import {
  Background,
  Button,
  Buttons,
  Container,
  ImageContainer,
  Main,
  MainTitle,
  SlideIcon,
  SlideIconContainer,
  SlideText,
  Texts,
} from './style';

export default function Page1() {
  const router = useRouter();

  return (
    <Background>
      <Main>
        <Container>
          <Texts>
            <MainTitle>
              주제부터 스크립트까지 <br /> 두디스로 한 번에
            </MainTitle>
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
          <Image 
            src={'/images/landing/svg/Landing_Section1_Automatic.svg'}
            alt={''}
            width={0}
            height={0}
            sizes="100vm"
            style={{ width: '80%', height: 'auto' }}
          />
          <ImageContainer>
            <div style={{ position: 'absolute' }}>
              <Image
                src={
                  '/images/landing/svg/Landing_Section1_Mockup_background.svg'
                }
                alt={''}
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
            <div style={{ position: 'absolute' }}>
              <Image
                src={'/images/landing/svg/Landing_Section1_Mockup.svg'}
                alt={''}
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </ImageContainer>
          <Image
            src="/images/landing/Landing_Section1_Mockup.png"
            alt={''}
            width={0}
            height={0}
            sizes="100vm"
            style={{ width: '80%', height: 'auto' }}
          />
          <Title>
            맞춤 소재 발굴부터 AI가 제안하는 <br /> 영상 기획까지 한 번에
          </Title>
          <SlideIconContainer>
            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_1.png"
                alt={''}
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>관심사 분석</SlideText>
            </SlideIcon>

            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_2.png"
                alt={''}
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>파생 소재 비교</SlideText>
            </SlideIcon>
            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_3.png"
                alt={''} 
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>경쟁강도 측정</SlideText>
            </SlideIcon>
            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_4.png"
                alt={''} 
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>조회수 예측</SlideText>
            </SlideIcon>
            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_5.png"
                alt={''}
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>유사채널 분석</SlideText>
            </SlideIcon>
            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_6.png"
                alt={''} 
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>자동 자료 수집</SlideText>
            </SlideIcon>
            <SlideIcon>
              <Image
                src="/images/landing/Landing_Section1_SlideIcon_7.png"
                alt={''} 
                width={0}
                height={0}
                sizes="100vm"
                style={{ width: '100%', height: 'auto' }}
              />
              <SlideText>콘텐츠 요약</SlideText>
            </SlideIcon>
          </SlideIconContainer>
        </Container>
      </Main>
    </Background>
  );
}
