import Image from 'next/image';
import {
  Background,
  ContainerA,
  ContainerB,
  Containers,
  ImageBox,
  Main,
  MoreButton,
  Texts,
} from './style';

export default function Page5() {
  return (
    <Background>
      <Main>
        <h2>🍋 오직 두디스에서만 제공하는 특별 기능!</h2>
        <Containers>
          <ContainerA>
            <Texts>
              <h3>✏️ 스토리보드</h3>
              <p>떠오른 콘텐츠를 바로 그려보세요</p>
            </Texts>
            <ImageBox>
              <Image
                src={`/images/landing/page5_1.png`}
                alt={''}
                width={556}
                height={521}
              />
            </ImageBox>
          </ContainerA>
          <ContainerA>
            <Texts>
              <h3>🧐 나에 대한 언급</h3>
              <p>다양한 채널의 시청자 반응을 살펴보세요</p>
            </Texts>
            <ImageBox>
              <Image
                src={`/images/landing/page5_2.png`}
                alt={''}
                width={556}
                height={521}
              />
            </ImageBox>
          </ContainerA>
          <ContainerB>
            <Texts>
              <h3>🔭 나와 유사한 채널</h3>
              <p>비슷한 키워드를 사용하는 채널을 참고하세요</p>
            </Texts>
            <ImageBox>
              <Image
                src={`/images/landing/page5_3.png`}
                alt={''}
                width={1000}
                height={380}
              />
            </ImageBox>
          </ContainerB>
        </Containers>
        <MoreButton>더 알아보기</MoreButton>
      </Main>
    </Background>
  );
}
