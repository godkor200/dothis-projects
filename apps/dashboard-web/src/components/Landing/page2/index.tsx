import Image from 'next/image';

import RevealWrapper from '@/components/Landing/RevealWrapper';

import {
  Background,
  Description,
  ImageBackground,
  ImageBackgroundContainer,
  ImageBox,
  ImageContainer,
  ImgMock,
  Main,
  Text,
  Title,
} from './style';

export default function Page2() {
  return (
    <Background>
      <Main>
        <Text>
          <Title>당신에게 추천하는 맞춤 아이템</Title>
          <Description>
            특허 받은 소재 탐색 알고리즘이 지금 가장 핫한 아이템을 추천해드려요.
          </Description>
        </Text>
        <ImageBox>
          <ImageBackgroundContainer>
            <ImageBackground />
          </ImageBackgroundContainer>
          <RevealWrapper>
            <ImageContainer>
              <ImgMock
                src={'/images/landing/svg/Landing_Section2_Mockup.svg'}
                alt={''}
              />
            </ImageContainer>
          </RevealWrapper>
        </ImageBox>
      </Main>
    </Background>
  );
}
