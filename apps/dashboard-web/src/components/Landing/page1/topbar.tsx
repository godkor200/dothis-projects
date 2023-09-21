'use client';

import { throttle } from 'lodash';
import Image from 'next/image';
<<<<<<< HEAD
import { useRouter } from 'next/navigation';
import Contact from 'public/aseets/svg/Landing/contact.svg';
import Content from 'public/aseets/svg/Landing/content.svg';
import Magicpen from 'public/aseets/svg/Landing/magicpen.svg';
import User from 'public/aseets/svg/Landing/user.svg';
import { useEffect, useState } from 'react';

import { CONTENT, SURVEY } from '@/constants/route';

import { Bar, Nav } from './style';
=======
import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';
import Contact from './svg/contact.svg';
import Content from './svg/content.svg';
import Magicpen from './svg/magicpen.svg';
import User from './svg/user.svg';
import { useEffect, useRef, useState } from 'react';
import { Bar, Nav } from './style';

import { content } from '@/constants/route';
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd

const SVG_SIZE = 32;
const CONTENT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4WwQb9SbmZMMhghQWQQ3Oh-q1slxewT4kpic3C-kf-YnXmw/viewform';

export default function Topbar() {
<<<<<<< HEAD
  const [width, setWidth] = useState<number>(0);

=======
  const [width, setWidth] = useState<number>(window.innerWidth);
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
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
<<<<<<< HEAD
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
=======
            <button onClick={() => router.push(content)}>
              <Content width={SVG_SIZE} height={SVG_SIZE} />
              <p>콘텐츠 분석</p>
            </button>
            <button onClick={() => router.push(content)}>
              <Magicpen width={SVG_SIZE} height={SVG_SIZE} />
              <p>키워드 분석</p>
            </button>
            <button onClick={() => router.push(content)}>
              <User width={SVG_SIZE} height={SVG_SIZE} />
              <p>내 채널 분석</p>
            </button>
            <a href={CONTENT_URL}>
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
              <button>
                <Contact width={SVG_SIZE} height={SVG_SIZE} />
                <p>Contact</p>
              </button>
            </a>
          </>
<<<<<<< HEAD
        ) : null}
=======
        ) : (
          <>
            <Content width={SVG_SIZE} height={SVG_SIZE} />
            <Magicpen width={SVG_SIZE} height={SVG_SIZE} />
            <User width={SVG_SIZE} height={SVG_SIZE} />
            <Contact width={SVG_SIZE} height={SVG_SIZE} />
          </>
        )}
>>>>>>> 1092b8af0fdac1d28e49c20dd5e8f0ef7b7527bd
      </Nav>
    </Bar>
  );
}
