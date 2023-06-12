import Image from 'next/image';
import styled from 'styled-components';

const Background = styled.div`
  height: 1901px;
  background-color: rgba(34, 34, 34, 1);
  color: white;

  display: flex;
  justify-content: center;
  position: relative;
`;

const Main = styled.main`
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 44px;
    font-weight: bolder;
  }
`;
const MoreButton = styled.button`
  width: 140px;
  height: 54px;
  border-radisu: 4px;
  border: 1px solid white;
  background-color: inherit;
  color: white;
  font-size: 20px;

  margin-top: 40px;
`;

const Container = styled.div`
  border-radius: 30px;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  padding-top: 80px;
`;

const ContainerA = styled(Container)`
  height: 766px;
`;

const ContainerB = styled(Container)`
  height: 645px;
  padding-bottom: 80px;
`;

const Texts = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 30px;
  margin-bottom: 67px;

  h3 {
    font-size: 30px;
    font-weight: bolder;
  }

  p {
    color: rgba(161, 161, 170, 1);
    font-size: 20px;
  }
`;

const Containers = styled.div`
  display: grid;
  grid-template-rows: 766px 645px;
  grid-template-columns: 1fr 1fr;
  margin-top: 50px;
  gap: 40px;

  div:nth-child(3) {
    grid-column: 1 / 3;
    grid-row: 2 / 3;
  }
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

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
