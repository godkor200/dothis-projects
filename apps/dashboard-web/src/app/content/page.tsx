'use client';

import styled from 'styled-components';
import Image from 'next/image';

const Background = styled.div`
  width: 100%;
  height: 2000px;
  position: relative;
`;

export default function Content() {
  return (
    <Background>
      <Image
        src={'/images/content.png'}
        alt={''}
        width={0}
        height={0}
        fill
        sizes={'100%'}
      />
    </Background>
  );
}
