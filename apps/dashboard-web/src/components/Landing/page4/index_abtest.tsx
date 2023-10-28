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

export default function Page4_abtest() {
  const router = useRouter();

  return (
    <Background>
      <Main>
        <Title>
          내가 선택한 소재, <br /> 시청자 반응은 괜찮을까?
        </Title>
        <Description>
          소재와 관련된 콘텐츠 반응을 한 눈에 보여드려요.
        </Description>
        <RevealWrapper>
          <ImageContainer>
            <Img
              src={'/images/landing/svg/Landing_Section3_Mockup_Group.svg'}
              alt={''}
            />
          </ImageContainer>
        </RevealWrapper>
      </Main>
    </Background>
  );
}
