import './global.css';

import localFont from '@next/font/local';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import Footer from '@/app/components/Footer';

import ClientContext from './ClientContext';
import GNB from './components/GNB';

// nextjs font 최적화
const font = localFont({
  src: '../assets/PretendardVariable.ttf',
  display: 'swap',
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={clsx(font.className, 'text-[16px]')}>
      <body className="flex min-h-screen">
        <ClientContext>
          <GNB />
          {children}
          {/*<Footer />*/}
        </ClientContext>
      </body>
    </html>
  );
}
