import { Container, HStack } from '@chakra-ui/react';
import { css } from '@emotion/react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { pagePath } from '@/constants';
import { colors, fontWeights, mediaQueries } from '@/styles';
import { isLinkActive } from '@/utils/appUtils';

export default function InquiryLayoutHeader() {
  const router = useRouter();
  return (
    <div css={contentsStyle}>
      <div className="inquiry-header">
        <Container>
          <h3>문의</h3>
        </Container>
      </div>
      <Container>
        <nav>
          <HStack as="ul" spacing={0}>
            <li
              className={clsx(
                isLinkActive(router, pagePath.notice()) && 'active',
              )}
            >
              <Link href={pagePath.notice()}>
                <span>공지사항</span>
              </Link>
            </li>
            {/*<li>*/}
            {/*  <Link href={pagePath.notice()} >*/}
            {/*    <a>고객센터</a>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            <li
              className={clsx(
                isLinkActive(router, pagePath.account()) && 'active',
              )}
            >
              <Link href={pagePath.account()}>
                <span>계정</span>
              </Link>
            </li>
          </HStack>
        </nav>
      </Container>
    </div>
  );
}

const contentsStyle = css`
  .inquiry-header {
    line-height: 48px;

    h3 {
      font-size: 24px;
      font-weight: ${fontWeights.sb};
    }

    ${mediaQueries.pc} {
      line-height: 80px;
    }
  }

  nav {
    ul {
      display: flex;
    }

    a {
      display: block;
      height: 34px;
      padding-right: 16px;
      font-weight: ${fontWeights.sb};
      font-size: 16px;

      span {
        display: inline-block;
        height: 100%;
      }
    }

    li.active a {
      font-weight: ${fontWeights.b};
      color: ${colors.primary.default};

      span {
        border-bottom: 3px solid ${colors.primary.default};
      }
    }
  }
`;
