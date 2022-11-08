import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';
import type { UrlObject } from 'url';

type Props = { href: UrlObject };
export default function HomeLogo({ href }: Props) {
  return (
    <Link href={href} passHref title="두디스 홈">
      <a css={style}>
        <img src="/images/dothis-logo.svg" alt="dothis logo" />
      </a>
    </Link>
  );
}

const style = css`
  width: 100%;
`;
