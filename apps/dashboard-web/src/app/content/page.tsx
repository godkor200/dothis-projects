'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import { PRICING } from '@/constants/route';

const Background = styled.div`


backgrounddefault
  height: 100%;

background
  width: 100%;
  aspect-ratio: 1440/3058;
  position: relative;

  @media (min-width: 1280px) {
    width: 1280px;
  }
`;

export default function Content() {
  const router = useRouter();
  return (
    <Background>
      <Image
        onClick={() => {
          router.push(PRICING);
        }}
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
