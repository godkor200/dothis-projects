import './global.css';
import './tempcss.css';

import localFont from '@next/font/local';
import clsx from 'clsx';
import type react from 'react';

import ClientContext from './ClientContext';

// nextjs font 최적화
const font = localFont({
  src: '../assets/PretendardVariable.ttf',
  display: 'swap',
});

type Props = {
  children: react.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko" className={clsx(font.className, 'text-[16px]')}>
      <body className="flex min-h-screen">
        <ClientContext>{children}</ClientContext>
      </body>
    </html>
  );
}
