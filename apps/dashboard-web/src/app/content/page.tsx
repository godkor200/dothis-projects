'use client';

import Image from 'next/image';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  aspect-ratio: 1440/3058;
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
