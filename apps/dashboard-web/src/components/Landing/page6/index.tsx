import Image from 'next/image';
import { useRouter } from 'next/navigation';

import RevealWrapper from '@/components/Landing/RevealWrapper';
import { CONTENT } from '@/constants/route';

import { Background, Description, ImageBox, Main, Texts, Title } from './style';

export default function Page6() {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <RevealWrapper>
          <ImageBox>
            <Image
              src={'/images/landing/page6.png'}
              alt={''}
              width={400}
              height={400}
            />
          </ImageBox>
        </RevealWrapper>
        <Texts>
          <Title>영상 기획, 오랜 시간 고민하지 말고 두디스</Title>
          <button
            onClick={() => {
              router.push(CONTENT);
            }}
          >
            <Image
              src={'/images/landing/logo_small.png'}
              alt={''}
              width={30}
              height={30}
            />
            <p>무료 체험하기</p>
          </button>
        </Texts>
      </Main>
    </Background>
  );
}
