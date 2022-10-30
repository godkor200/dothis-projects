import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

import { pagePath } from '@/constants';

export default function HomeLogo() {
  return (
    <Link href={pagePath.home()} passHref title="두디스 홈">
      <a css={style}>
        <img src="/images/dothis-logo.svg" alt="dothis logo" />
      </a>
    </Link>
  );
}

const style = css`
  width: 100%;
`;
