import './globalStyle.css';

import localFont from '@next/font/local';
import { clsx } from 'clsx';
import type { ReactNode } from 'react';

import Footer from '@/app/components/Footer';

import ClientContext from './ClientContext';
import GNB from './components/GNB';

const font = localFont({
  src: '../assets/PretendardVariable.ttf',
  display: 'swap',
});

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={font.className}>
      <body>
        <ClientContext>
          <GNB />
          {children}
          <Footer />
        </ClientContext>
      </body>
    </html>
  );
}
