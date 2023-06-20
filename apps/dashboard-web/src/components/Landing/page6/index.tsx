import Image from 'next/image';
import { Background, ImageBox, Main, Texts } from './style';
import { useRouter } from 'next/navigation';
import { content } from '@/constants/route';

export default function Page6() {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <ImageBox>
          <Image
            src={'/images/landing/page6.png'}
            alt={''}
            width={500}
            height={500}
          />
        </ImageBox>
        <Texts>
          <h3>영상 기획, 오랜 시간 고민하지 말고 두-디스</h3>
          <button
            onClick={() => {
              router.push(content);
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
