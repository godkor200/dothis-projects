import Image from 'next/image';
import { useState } from 'react';
import { Background, ImageBox, Main } from './style';
import { Category, CategroiesContainer, MoreButton } from '../style';
import { useRouter } from 'next/navigation';
import { dummy } from '@/constants/route';

export default function Page4() {
  const [state, setState] = useState<number>(0);
  const titles = ['채널별 연관 콘텐츠', '시청자 반응', '콘텐츠 요약'];
  const router = useRouter();
  return (
    <Background>
      <Main>
        <h3>📊 한 눈에 보이는 트렌드</h3>
        <CategroiesContainer>
          {titles.map((value: string, key: number) => {
            return (
              <Category
                key={`page4_menu_${key}`}
                onClick={() => {
                  setState(key);
                }}
                select={state === key ? 1 : 0}
              >
                {value}
              </Category>
            );
          })}
        </CategroiesContainer>
        <ImageBox>
          <Image
            src={`/images/landing/trend_0${state + 1}.png`}
            alt={`${state} image`}
            width={0}
            height={0}
            sizes="100%"
            fill
          />
        </ImageBox>
        <MoreButton
          onClick={() => {
            router.push(dummy);
          }}
        >
          더 알아보기
        </MoreButton>
      </Main>
    </Background>
  );
}
