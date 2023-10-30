import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import RevealWrapper from '@/components/Landing/RevealWrapper';

import { Category, CategroiesContainer, MoreButton } from '../style';
import {
  Background,
  Description,
  ImageContainer,
  Img,
  Main,
  Title,
} from './style';

export default function Page4() {
  const router = useRouter();

  return (
    <Background>
      <Main>
        <Title>
          어려운 스토리보드 작성? <br /> 따라하기만 하세요.
        </Title>
        <Description>
          AI가 화면 구성은 물론 스크립트 작성까지 모두 가이드 해드립니다.
        </Description>
        <RevealWrapper>
          <ImageContainer>
            <Img
              src={'/images/landing/svg/Landing_Section4_Mockup_Group.svg'}
              alt={''}
            />
          </ImageContainer>
        </RevealWrapper>
      </Main>
    </Background>
  );
}
