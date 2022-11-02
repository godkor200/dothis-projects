import { css } from '@emotion/react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';

import MobileActionBar from '@/components/article/MobileActionBar';

import LayoutFooter from './LayoutFooter';
import LayoutHeader from './LayoutHeader';

export const siteTitle = 'DoThis';

type Props = {
  children: ReactNode;
};
export default function LayoutTemplate({ children }: Props) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <link rel='icon' href='/public/favicon.ico' />
        <meta
          name='description'
          content='두디스 - 보고 싶던 콘텐츠, 이젠 두디스에서'
        />
        <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>
      <LayoutHeader />
      <main css={mainWrapperStyle}>{children}</main>
      {session?.user && <MobileActionBar />}

      <LayoutFooter />
    </>
  );
}
const mainWrapperStyle = css`
  flex: auto;
  width: 100%;
`;
