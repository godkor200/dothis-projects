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

import { Bar, Nav } from './style';

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
    <Bar>
      <Image
        src={'/images/landing/logo_medium.png'}
        alt={'logo_medium'}
        width={204}
        height={48}
      />
      <Nav>
        {width > 1000 ? (
          <>
            <button onClick={() => router.push(CONTENT)}>
              <Content width={SVG_SIZE} height={SVG_SIZE} />
              <p>콘텐츠 분석</p>
            </button>
            <button onClick={() => router.push(CONTENT)}>
              <Magicpen width={SVG_SIZE} height={SVG_SIZE} />
              <p>키워드 분석</p>
            </button>
            <button onClick={() => router.push(CONTENT)}>
              <User width={SVG_SIZE} height={SVG_SIZE} />
              <p>내 채널 분석</p>
            </button>
            <a href={SURVEY}>
              <button>
                <Contact width={SVG_SIZE} height={SVG_SIZE} />
                <p>Contact</p>
              </button>
            </a>
          </>
        ) : null}
      </Nav>
    </Bar>
  );
}
