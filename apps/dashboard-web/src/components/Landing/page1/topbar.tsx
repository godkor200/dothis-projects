import Image from 'next/image';
import { throttle } from 'lodash';
import { useRouter } from 'next/navigation';
import Contact from './svg/contact.svg';
import Content from './svg/CONTENT.svg';
import Magicpen from './svg/magicpen.svg';
import User from './svg/user.svg';
import { useEffect, useState } from 'react';
import { Bar, Nav } from './style';

import { CONTENT, SURVEY } from '@/constants/route';

const SVG_SIZE = 32;

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
