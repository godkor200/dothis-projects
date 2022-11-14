import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';
import type { UrlObject } from 'url';

type Props = { href: UrlObject };
export default function HomeLogo({ href }: Props) {
  return (
    <Link href={href} title="두디스 홈" css={style}>
      <img src="/images/dothis-logo.svg" alt="dothis logo" />
    </Link>
  );
}

const style = css`
  width: 100%;
`;
