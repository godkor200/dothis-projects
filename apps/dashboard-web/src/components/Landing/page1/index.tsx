import Image from 'next/image';

import Search from './svg/search.svg';
import Topbar from './topbar';
import { Background, Buttons, ImageBox, Main, Texts } from './style';

export default function Page1() {
  return (
    <Background>
      <Topbar />
      <Main>
        <ImageBox>
          <Image
            src="/images/landing/page1.png"
            width={0}
            height={0}
            sizes="100%"
            fill
            alt={'page1 image'}
          />
        </ImageBox>
        <Texts>
          <h3>
            콘텐츠 기획부터 키워드 추천, 트렌드 분석까지 바로 지금 Do this
            하세요
          </h3>
          <Buttons>
            <button>
              <Image
                src={'/images/landing/logo_small.png'}
                alt={'logo_small'}
                width={30}
                height={30}
              />
              <p>무료 체험하기</p>
            </button>
            <button>
              <Search width={30} height={30} />
              <p>요금제 알아보기</p>
            </button>
          </Buttons>
        </Texts>
      </Main>
    </Background>
  );
}
