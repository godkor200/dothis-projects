import './global.css';
import './tempcss.css';

import localFont from '@next/font/local';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import ClientContext from './ClientContext';
import Footer from './components/Footer';
import GNB from './components/GNB';
import Header from './components/Header';
import Main from './components/Main';
import Sidebar from './components/Sidebar';
import StyledComponentsRegistry from './lib/registry';

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
          <StyledComponentsRegistry>
            <div className="template">
              <Sidebar />
              <Header />
              <Main children={children} />
              <div className="footer">footer</div>
            </div>
          </StyledComponentsRegistry>
        </ClientContext>
      </body>
    </html>
  );
}
