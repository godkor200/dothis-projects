import Image from 'next/image';

import { Description, Title } from '../style';
import {
  Background,
  ImageBox,
  Main,
} from './style';

export default function Page5() {
  return (
    <Background>
      <Main>
        <Title>1초 간편 회원가입으로 지금 바로 시작해보세요.</Title>
        <ImageBox>
          <Image
            src={'/images/landing/svg/Landing_Section5_Image.svg'}
            alt={''}
            width={0}
            height={0}
            sizes="100vm"
            style={{ width: '80%', height: 'auto' }}
          />
        </ImageBox>
      </Main>
    </Background>
  );
}
