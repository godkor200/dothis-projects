import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { NOT_FOUND } from '@/constants/route';

import { Background, ImageBox, Main, Text } from './style';
export default function Page2() {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <ImageBox>
          <Image
            src={'/images/landing/page2.png'}
            alt={''}
            width={680}
            height={560}
            sizes="100%"
          />
        </ImageBox>
        <Text>
          <h3>
            유튜브 콘텐츠, <br /> 10분만에 기획을 간단하게
          </h3>
          <p>
            조회수 높이는 맞춤형 소재부터 포맷에 따른 <br />
            스토리보드 도구까지 한곳에서 간편하게!
          </p>
          <button
            onClick={() => {
              router.push('/');
            }}
          >
            더 알아보기
          </button>
        </Text>
      </Main>
    </Background>
  );
}
