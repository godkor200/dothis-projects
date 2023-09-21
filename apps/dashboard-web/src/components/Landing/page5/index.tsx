import Image from 'next/image';
<<<<<<< HEAD

=======
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
import {
  Background,
  ContainerA,
  ContainerB,
  Containers,
  ImageBox,
  Main,
  MoreButton,
  Texts,
<<<<<<< HEAD
  Title,
  TopContainer,
} from './style';
=======
} from './style';
import { useRouter } from 'next/navigation';
import { dummy } from '@/constants/route';
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd

export default function Page5() {
  const router = useRouter();
  return (
    <Background>
      <Main>
        <Title>
          <span>🍋 오직 두디스에서만 </span>
          <span> 제공하는 특별 기능!</span>
        </Title>
        <Containers>
          <TopContainer>
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
          </TopContainer>
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
        <MoreButton
          onClick={() => {
<<<<<<< HEAD
            alert('준비중입니다');
=======
            router.push(dummy);
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
          }}
        >
          더 알아보기
        </MoreButton>
      </Main>
    </Background>
  );
}
