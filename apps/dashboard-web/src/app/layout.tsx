import '@/styles/global.css';

import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import { StyledComponentsRegistry } from '@/app/StyledComponentsRegistry';
import Analytics from '@/components/Analytics';
import { pretendard } from '@/styles/font';

import ClientContext from './ClientContext';
import RootHeader from './head';

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ko">
      <RootHeader />
      <body
        className={clsx(pretendard.className, 'text-[16px]')}
        suppressHydrationWarning={true}
      >
        <Analytics />
        <StyledComponentsRegistry>
          <ClientContext>
            <div>{children}</div>
          </ClientContext>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
