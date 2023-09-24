'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from 'public/aseets/svg/Landing/search.svg';
import { useEffect, useState } from 'react';

import { CONTENT, PRICING } from '@/constants/route';

import { theme } from '../style';
import {
  Background,
  Button,
  ButtonContainer,
  Container,
  ImgAutomatic,
  ImgMock,
  ImgMockBackground,
  Main,
  MainTitle,
  SlideIcon,
  SlideIconContainer,
  SlideText,
  Texts,
  Title,
} from './style';
const SVGPATH = '/images/landing/svg/';

export default function Page1() {
  const router = useRouter();
  const [svgAutomatic, setSvgAutomatic] = useState<string>(
    SVGPATH + 'Landing_Section1_Automatic.svg',
  ); // 기본 경로 설정
  const [svgMockBackground, setSvgMockBackground] = useState<string>(
    SVGPATH + 'Landing_Section1_Mockup_background.svg',
  ); // 기본 경로 설정

  useEffect(() => {
    // 화면 크기에 따라 SVG 파일 경로 조정
    const handleResize = () => {
      if (window.innerWidth < parseInt(theme.breakpoints.mobile)) {
        setSvgAutomatic(SVGPATH + 'Landing_Section1_Automatic_mobile.svg'); // 작은 화면에 맞는 경로 설정
        setSvgMockBackground(
          SVGPATH + 'Landing_Section1_Mockup_background_mobile.svg',
        ); // 작은 화면에 맞는 경로 설정
      } else {
        setSvgAutomatic(SVGPATH + 'Landing_Section1_Automatic.svg'); // 큰 화면에 맞는 경로 설정
        setSvgMockBackground(
          SVGPATH + 'Landing_Section1_Mockup_background.svg',
        ); // 큰 화면에 맞는 경로 설정
      }
    };

    handleResize(); // 초기 로딩 시 설정
    window.addEventListener('resize', handleResize); // 화면 크기 변경 시 설정 업데이트
    return () => {
      window.removeEventListener('resize', handleResize); // 컴포넌트 언마운트 시 이벤트 리스너 제거
    };
  }, []);

  return (
    <Background>
      <Main>
        <Container>
          <Texts>
            <MainTitle>
              주제부터 스크립트까지 <br /> 두디스로 한 번에
            </MainTitle>
            <ButtonContainer>
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
            </ButtonContainer>
          </Texts>
          <ImgAutomatic src={svgAutomatic} alt={''} />
          <Container>
            <ImgMockBackground src={svgMockBackground} alt={''} />
            <ImgMock
              src={'/images/landing/svg/Landing_Section1_Mockup.svg'}
              alt={''}
            />
          </Container>
          <Title>
            나에게 딱 맞는 소재 발굴부터 AI가 제안하는 영상 기획까지 <br /> 한 번에
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
