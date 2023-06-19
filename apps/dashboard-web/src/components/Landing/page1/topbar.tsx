import Image from 'next/image';
import styled from 'styled-components';
import { throttle } from 'lodash';

import Contact from './svg/contact.svg';
import Content from './svg/content.svg';
import Magicpen from './svg/magicpen.svg';
import User from './svg/user.svg';
import { useEffect, useState } from 'react';
import { Bar, Nav } from './style';

const SVG_SIZE = 32;

export default function Topbar() {
  const [width, setWidth] = useState<number>(window.innerWidth);

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
            <button>
              <Content width={SVG_SIZE} height={SVG_SIZE} />
              <p>콘텐츠 분석</p>
            </button>
            <button>
              <Magicpen width={SVG_SIZE} height={SVG_SIZE} />
              <p>키워드 분석</p>
            </button>
            <button>
              <User width={SVG_SIZE} height={SVG_SIZE} />
              <p>내 채널 분석</p>
            </button>
            <button>
              <Contact width={SVG_SIZE} height={SVG_SIZE} />
              <p>Contact</p>
            </button>
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
