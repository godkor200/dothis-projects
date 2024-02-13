/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import SearchBar from '@/components/MainContents/KeywordSearch/SearchBar';
import { CONTENT, PRICING } from '@/constants/route';

import {
  Background,
  Button,
  ButtonContainer,
  Container,
  ImageBackground,
  ImageBackgroundContainer,
  ImageBox,
  ImageContainer,
  ImgMock,
  ImgMockBackground,
  Main,
  Pink,
  SearchBarContainer,
  Texts,
  Title,
} from './style';

export default function Temp_page() {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(CONTENT);
  }, []);
  return (
    <Background>
      <Main>
        <Container>
          <Texts>
            <Title>
              <Pink>조회수</Pink>가 잘 나오는 키워드는 뭘까? <br />
              지금 <Pink>두디스</Pink>에서 확인하세요!
            </Title>
          </Texts>
          <ButtonContainer>
            <SearchBarContainer>
              <SearchBar />
            </SearchBarContainer>

            <Button onClick={() => router.push(CONTENT)}>
              <p>지금 바로 알아보기</p>
            </Button>
          </ButtonContainer>
          <ImageBox>
            <ImageBackgroundContainer>
              <ImageBackground />
            </ImageBackgroundContainer>
            <ImageContainer>
              <ImgMock
                src={'/images/landing/svg/Landing_Section2_Mockup.svg'}
                alt={''}
              />
            </ImageContainer>
          </ImageBox>
        </Container>
      </Main>
    </Background>
  );
}
