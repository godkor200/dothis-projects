import { colors, Container, SvgDothisLogo, mediaQueries, typo } from '@dothis/share';
import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

import { pagePath } from '@/constants';
import { HomeLogo } from '@/components/ui/HomeLogo';

export default function LayoutFooter() {
  return (
    <footer css={style}>
      <Container className='footer-container'>
        <div className='footer-info'>
          <HomeLogo href={pagePath.home()}/>
          <p className='footer-info-contents'>
            두디스 | 대표이사 : 민상현 | 개인정보 보호 최고책임자 : 박순헌
            <br />
            사업자등록번호 : 685-87-02606 | 메일 :
            <a href='mailto:ceo@dothis.world'>ceo@dothis.world</a>
            <br />
            주소 : 서울 구로구 디지털로30길 28 마리오타워, 804-2호(구로동)
            <br />
            28, digital-ro 30-gil, Guro-gu, Seoul, Republic of Korea
          </p>
          <p className='footer-copyright'>
            Copyright ⓒ 2022 Dothis, Inc. All rights reserved
          </p>
        </div>

        <div className='footer-links'>
          {/* <div>
            <a>
              <strong>소개</strong>
            </a>
            <Link href="/src/pages">
              <a>
                <span>서비스 소개</span>
              </a>
            </Link>
            <Link href="/src/pages">
              <a>
                <span>이용방법 설명</span>
              </a>
            </Link>
          </div> */}
          <div>
            {/* <a>
              <strong>문의</strong>
            </a> */}
            {/*<Link href="/src/pages">*/}
            {/*  <a>*/}
            {/*    <span>자주 묻는 질문</span>*/}
            {/*  </a>*/}
            {/*</Link>*/}
          </div>
          <div>
            {/* <a>
              <strong>회사</strong>
            </a> */}
            <Link href='https://dothis-world.notion.site/1a7e28e24d3d406399d784da996fa1c8'>
              <span>회사소개</span>
            </Link>
            <Link href='/policy'>
              <span>서비스 이용약관</span>
            </Link>
            <Link href='/privacy'>
              <span>개인정보 처리방침</span>
            </Link>
            <Link href='http://pf.kakao.com/_Txcwuxj/chat' target='_blank'>
              <span>고객센터</span>
            </Link>
            <Link
              href='https://dothis-world.notion.site/b19467c5c36842cb95939bb98673f20d?v=1d43683f41e84112820f6771a8b02c80'>
              <span>공지사항</span>
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const style = css`
  display: none;
  border-top: 1px solid ${colors.border['2']};
  padding-top: 38px;
  padding-bottom: 56px;

  ${mediaQueries.tablet} {
    display: flex;
  }

  .footer-container {
    display: flex;
    justify-content: space-between;
  }

  .footer-info-contents {
    margin: 24px 0;
    color: ${colors.gray['60']};
    line-height: 24px;
    ${typo.b2};
  }

  .footer-copyright {
    color: ${colors.gray['40']};
    ${typo.t4};
  }

  .footer-links {
    display: flex;
    gap: 61px;
    color: ${colors.gray['80']};
    ${typo.b2};

    a {
      display: block;
      height: 32px;
    }
  }
`;
