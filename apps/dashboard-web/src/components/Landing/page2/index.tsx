import Image from 'next/image';

import { Background, Description, ImageBox, Main, Text, Title } from './style';

export default function Page2() {
  return (
    <Background>
      <Main>
        <Text>
          <Title>
            맞춤 소재 발굴부터 AI가 제안하는 <br /> 영상 기획까지 한 번에
          </Title>
        </Text>
        <ImageBox>
          <Image
            width={680}
            height={560}
            sizes="100%" src={''} alt={''}
          />
        </ImageBox>
        <Text>
          <Title>
            유튜브 콘텐츠, <br /> 10분만에 기획을 간단하게
          </Title>
          <Description>
            조회수 높이는 맞춤형 소재부터 포맷에 따른 <br />
            스토리보드 도구까지 한곳에서 간편하게!
          </Description>
          <button
            onClick={() => {
              alert('준비중입니다');
            }}
          >
            더 알아보기
          </button>
        </Text>
      </Main>
    </Background>
  );
}
