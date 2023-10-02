/* eslint-disable tailwindcss/no-custom-classname */
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
const slides = [
  {
    text: '관심사 분석',
    src: '/images/landing/Landing_Section1_SlideIcon_1.png',
  },
  {
    text: '파생 소재 비교',
    src: '/images/landing/Landing_Section1_SlideIcon_2.png',
  },
  {
    text: '경쟁강도 측정',
    src: '/images/landing/Landing_Section1_SlideIcon_3.png',
  },
  {
    text: '조회수 예측',
    src: '/images/landing/Landing_Section1_SlideIcon_4.png',
  },
  {
    text: '유사채널 분석',
    src: '/images/landing/Landing_Section1_SlideIcon_5.png',
  },
  {
    text: '자동 자료 수집',
    src: '/images/landing/Landing_Section1_SlideIcon_6.png',
  },
  {
    text: '콘텐츠 요약',
    src: '/images/landing/Landing_Section1_SlideIcon_7.png',
  },
  {
    text: '스토리보드 작성',
    src: '/images/landing/Landing_Section1_SlideIcon_8.png',
  },
  {
    text: '가이드라인 제시',
    src: '/images/landing/Landing_Section1_SlideIcon_9.png',
  },
];

export default function Page1() {
  const router = useRouter();
  // 기본 경로 설정
  const [svgAutomatic, setSvgAutomatic] = useState<string>(
    SVGPATH + 'Landing_Section1_Automatic.svg',
  );
  const [svgMockBackground, setSvgMockBackground] = useState<string>(
    SVGPATH + 'Landing_Section1_Mockup_background.svg',
  );

  useEffect(() => {
    // 화면 크기에 따라 SVG 파일 경로 조정
    const handleResize = () => {
      if (window.innerWidth < parseInt(theme.breakpoints.mobile)) {
        // 작은 화면에 맞는 경로 설정
        setSvgAutomatic(SVGPATH + 'Landing_Section1_Automatic_mobile.svg');
        setSvgMockBackground(
          SVGPATH + 'Landing_Section1_Mockup_background_mobile.svg',
        );
      } else {
        // 큰 화면에 맞는 경로 설정
        setSvgAutomatic(SVGPATH + 'Landing_Section1_Automatic.svg');
        setSvgMockBackground(
          SVGPATH + 'Landing_Section1_Mockup_background.svg',
        );
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
            나에게 딱 맞는 소재 발굴부터 AI가 제안하는 영상 기획까지
            <br /> 한 번에
          </Title>
          <SlideIconContainer>
            {slides.map((s, i) => (
              <SlideIcon key={i}>
                <Image
                  src={s.src}
                  alt={''}
                  width={0}
                  height={0}
                  sizes="100vm"
                  style={{ width: '100%', height: 'auto' }}
                />
                <SlideText>{s.text}</SlideText>
              </SlideIcon>
            ))}
            {slides.map((s, i) => (
              <SlideIcon key={i}>
                <Image
                  src={s.src}
                  alt={''}
                  width={0}
                  height={0}
                  sizes="100vm"
                  style={{ width: '100%', height: 'auto' }}
                />
                <SlideText>{s.text}</SlideText>
              </SlideIcon>
            ))}
          </SlideIconContainer>
        </Container>
      </Main>
    </Background>
  );
}