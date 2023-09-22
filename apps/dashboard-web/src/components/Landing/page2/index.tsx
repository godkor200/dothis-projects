import Image from 'next/image';

import { Title, Description } from '../style';
import {
  Background,
  ImageBackground,
  ImageBackgroundContainer,
  ImageBox,
  ImageContainer,
  Main,
  Text,
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
          <ImageContainer>
            <Image
              src={'/images/landing/svg/Landing_Section2_Mockup.svg'}
              alt={''}
              width={0}
              height={0}
              sizes="100vm"
              style={{ width: '80%', height: 'auto' }}
            />
          </ImageContainer>
        </ImageBox>
      </Main>
    </Background>
  );
}
