'use client';

import { throttle } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Contact from 'public/aseets/svg/Landing/contact.svg';
import Content from 'public/aseets/svg/Landing/content.svg';
import Magicpen from 'public/aseets/svg/Landing/magicpen.svg';
import User from 'public/aseets/svg/Landing/user.svg';
import { useEffect, useState } from 'react';

import { CONTENT, SURVEY } from '@/constants/route';

import { Background, Bar, Button, Main, Nav } from './style';

const SVG_SIZE = 32;
const CONTENT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4WwQb9SbmZMMhghQWQQ3Oh-q1slxewT4kpic3C-kf-YnXmw/viewform';

export default function Topbar() {
  const [width, setWidth] = useState<number>(0);

  const router = useRouter();

  const resizeHandler = throttle(() => {
    setWidth(window.innerWidth);
  }, 10);

  useEffect(() => {
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Background>
      <Main>
        <Bar></Bar>
        <Button onClick={() => window.open(CONTENT_URL)}>
          <Image
            src={'/images/landing/svg/Toolbar_icon_campaign.svg'}
            alt={''}
            width={30}
            height={30}
          />
          <p>설문조사 참여하고 커피 쿠폰 받기</p>
        </Button>
      </Main>
    </Background>
  );
}