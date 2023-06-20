import Image from 'next/image';
import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';
import Contact from './svg/contact.svg';
import Content from './svg/content.svg';
import Magicpen from './svg/magicpen.svg';
import User from './svg/user.svg';
import { useEffect, useRef, useState } from 'react';
import { Bar, Nav } from './style';

import { content } from '@/constants/route';

const SVG_SIZE = 32;
const CONTENT_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSc4WwQb9SbmZMMhghQWQQ3Oh-q1slxewT4kpic3C-kf-YnXmw/viewform';

export default function Topbar() {
  const [width, setWidth] = useState<number>(window.innerWidth);
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
              <button>
                <Contact width={SVG_SIZE} height={SVG_SIZE} />
                <p>Contact</p>
              </button>
            </a>
          </>
        ) : (
          <>
            <Content width={SVG_SIZE} height={SVG_SIZE} />
            <Magicpen width={SVG_SIZE} height={SVG_SIZE} />
            <User width={SVG_SIZE} height={SVG_SIZE} />
            <Contact width={SVG_SIZE} height={SVG_SIZE} />
          </>
        )}
      </Nav>
    </Bar>
  );
}
