<<<<<<< HEAD
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from 'public/aseets/svg/Landing/search.svg';

import { CONTENT, PRICING } from '@/constants/route';

import {
  Background,
  Button,
  Buttons,
  Circle,
  CircleText,
  CircleBox,
  Description,
  ImageBox,
  Main,
  Texts,
  Title,
} from './style';
import Topbar from './topbar';
=======
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Search from './svg/search.svg';
import Topbar from './topbar';
import { Background, Buttons, ImageBox, Main, Texts } from './style';
import { content, pricing } from '@/constants/route';
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd

export default function Page1() {
  const router = useRouter();

  return (
    <Background>
      <Topbar />
      <Main>
<<<<<<< HEAD
=======
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
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
        <Texts>
          <Title>
            주제부터 스크립트까지 <br /> 두디스로 한 번에
          </Title>
          <Buttons>
<<<<<<< HEAD
            <Button onClick={() => router.push(CONTENT)}>
=======
            <button onClick={() => router.push(content)}>
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
              <Image
                src={'/images/landing/logo_small.png'}
                alt={'logo_small'}
                width={30}
                height={30}
              />
              <p>무료 체험하기</p>
<<<<<<< HEAD
            </Button>
            <Button
              onClick={() => {
                router.push(PRICING);
=======
            </button>
            <button
              onClick={() => {
                router.push(pricing);
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
              }}
            >
              <Search width={30} height={30} />
              <p>요금제 알아보기</p>
            </Button>
          </Buttons>
        </Texts>
        <CircleBox>
          <Image
                src={'/images/landing/Landing_Section1_Rightshift.png'}
                alt={''}
                width={30}
                height={30}
              />
          <Circle>
            <CircleText>영상 제작</CircleText>
          </Circle>
        </CircleBox>
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
      </Main>
    </Background>
  );
}
