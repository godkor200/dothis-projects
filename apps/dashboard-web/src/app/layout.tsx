/* eslint-disable @next/next/no-script-component-in-head */
/* eslint-disable @next/next/no-before-interactive-script-outside-document */

import '@/styles/global.css';

import clsx from 'clsx';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import type { PropsWithChildren } from 'react';

import { StyledComponentsRegistry } from '@/app/StyledComponentsRegistry';
import Analytics from '@/components/Analytics';
import { pretendard } from '@/styles/font';
import StyledTheme from '@/styles/StyledTheme';

import ClientContext from './ClientContext';

export const metadata: Metadata = {
  title: '두디스 - 영상 트렌드 분석 솔루션',
  description: '영상 트렌드 분석 솔루션, 두디스',
  openGraph: {
    type: 'website',
    title: '두디스(Dothis)',
    description: '영상 트렌드 분석 솔루션, 두디스.',
    images:
      'https://dothis-lending.s3.ap-northeast-2.amazonaws.com/dothisLogo.png',
    url: 'https://dothis.kr',
  },
  verification: {
    google: 'jKXKt6DfOazkbZWSOTusR4De32UKhBG2pey4WTVnU9c',
    other: {
      ['naver-site-verification']: '8997e374cea61b2a490fd17b0203001f88a4eabf',
    },
  },
  icons: {
    icon: '/logo.ico',
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <head>
        <Analytics />
      </head>
      <body
        className={clsx(pretendard.className, 'text-[16px]')}
        suppressHydrationWarning={true}
      >
        <StyledComponentsRegistry>
          <StyledTheme>
            <ClientContext>
              {children}

              <div id="router-modal-root" />
            </ClientContext>
          </StyledTheme>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

// export default dynamic(() => Promise.resolve(RootLayout), { ssr: false });
