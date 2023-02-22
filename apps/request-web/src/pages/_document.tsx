import createCache from '@emotion/cache';
import createEmotionServer from '@emotion/server/create-instance';
import axios from 'axios';
import { enableMapSet } from 'immer';
import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import superjson from 'superjson';

import { colors } from '@/styles/dothisTheme';

const isBrowser = typeof document !== 'undefined';

// immer Map Set 사용 가능하게
enableMapSet();

// superjson으로 변환
axios.defaults.transformResponse = (data, headers) => {
  try {
    return typeof data === 'string' ? superjson.parse(data) : data;
  } catch (e) {
    return data;
  }
};
const description = '콘텐츠 요청 크리에이터 스폰서쉽 플랫폼 서비스';
const title = '두디스 리퀘스트';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="title" content={title} />
          <meta name="description" content={description} />
          <AppMeta />
          {/*<meta name="emotion-insertion-point" content="" />*/}
          {(this.props as any).emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="root-modal" />
        </body>
      </Html>
    );
  }
}

export const AppMeta = () => (
  <>
    <meta name="application-name" content={title} />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content={title} />
    <meta name="description" content={description} />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="msapplication-config" content="/icons/browserconfig.xml" />
    <meta name="msapplication-TileColor" content={colors.primary.default} />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="theme-color" content={colors.primary.default} />

    <link rel="apple-touch-icon" href="/icons/logo/logo-180.png" />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/icons/logo/logo-152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/icons/logo/logo-180.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="167x167"
      href="/icons/logo/logo-167.png"
    />

    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/icons/logo/logo-32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/icons/logo/logo-16.png"
    />
    <link rel="manifest" href="/manifest.json" />
    <link rel="mask-icon" href="/icons/logo/logo-180.png" color="#fff" />
    <link rel="shortcut icon" href="/icons/logo/logo-32.png" />

    <meta name="twitter:card" content={description} />
    <meta name="twitter:url" content="https://dothis.world/" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta
      name="twitter:image"
      content="https://dothis.world/icons/logo-192.png"
    />
    <meta name="twitter:creator" content="dothis" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content={title} />
    <meta property="og:url" content="https://dothis.world/" />
    <meta
      property="og:image"
      content="https://dothis.world/icons/logo/logo-180.png"
    />
  </>
);
