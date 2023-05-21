import './global.css';

import localFont from '@next/font/local';
import clsx from 'clsx';
import type { ReactNode } from 'react';
import "./tempcss.css";
import ClientContext from './ClientContext';
import GNB from './components/GNB';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';


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
          <div className='template'>
          <Sidebar/>
          <Header/>
          <Main children={children}/>
          <div className='footer'>footer</div>
          </div>
          
        </ClientContext>
      </body>
    </html>
  );
}
