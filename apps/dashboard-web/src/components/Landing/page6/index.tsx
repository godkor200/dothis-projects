import Image from 'next/image';
import { useRouter } from 'next/navigation';

import RevealWrapper from '@/components/common/Reveal/RevealWrapper';
import { CONTENT } from '@/constants/route';

import { Background, Description, ImageBox, Main, Texts, Title } from './style';

const CONTENT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4WwQb9SbmZMMhghQWQQ3Oh-q1slxewT4kpic3C-kf-YnXmw/viewform';

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
              // router.push(CONTENT);
              router.push(CONTENT_URL);
            }}
          >
            <Image
              src={'/images/landing/logo_small.png'}
              alt={''}
              width={30}
              height={30}
            />
              {/* <p>무료 체험하기</p> */}
              <p>예약하기</p>
          </button>
        </Texts>
      </Main>
    </Background>
  );
}
