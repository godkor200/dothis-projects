'use client';

import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import { ceoMail } from '@/constants/etc';

import SvgComp from '../../components/share/SvgComp';

function Footer() {
  return (
    <FooterLayout>
      <LinkContainer>
        <LogoWrapper>
          <Link href={'/'} title="두디스 홈">
            <SvgComp icon="FooterLogo" width="11.25rem" height="2.5rem" />
          </Link>
        </LogoWrapper>

        <AboutWrapper>
          <Link
            href={
              'https://dothis-world.notion.site/1a7e28e24d3d406399d784da996fa1c8' as Route
            }
          >
            <span>회사소개</span>
          </Link>
          <Link href="/about/policy">
            <span>서비스 이용약관</span>
          </Link>
          <Link href="/about/privacy">
            <span>개인정보 처리방침</span>
          </Link>

          <Link
            href={
              'https://dothis-world.notion.site/b19467c5c36842cb95939bb98673f20d?v=1d43683f41e84112820f6771a8b02c80' as Route
            }
          >
            <span>공지사항</span>
          </Link>

          <Link
            href={'http://pf.kakao.com/_Txcwuxj/chat' as Route}
            target="_blank"
          >
            <span>고객센터</span>
          </Link>
        </AboutWrapper>
      </LinkContainer>

      <Text>
        두디스 | 대표이사 : 민상현 | 개인정보 보호 최고책임자 : 유병국
        <br />
        사업자등록번호 : 685-87-02606 | 메일 : &nbsp;
        <a href={`mailto:${ceoMail}`}>{ceoMail}</a>
        <br />
        주소 : 서울 구로구 디지털로30길 28 마리오타워, 804-2호(구로동)
        <br />
        28, digital-ro 30-gil, Guro-gu, Seoul, Republic of Korea
      </Text>
      <Copyright>Copyright ⓒ 2022 Dothis, Inc. All rights reserved</Copyright>
    </FooterLayout>
  );
}

export default Footer;

const FooterLayout = styled.footer`
  padding: 6.25rem 3rem 6.25rem 9.375rem;
  border-top: 1px solid #d4d4d8;
`;

const LinkContainer = styled.h2`
  display: flex;
  justify-content: end;
  align-items: center;

  margin-bottom: 2.5rem;
`;

const LogoWrapper = styled.div`
  margin-right: auto;
`;

const AboutWrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  font-size: 1.125rem;
  font-weight: 800;
`;

const Text = styled.p`
  margin-bottom: 1.25rem;

  font-size: 0.875rem;
  color: #71717a;
`;

const Copyright = styled.span`
  font-size: 0.75rem;
  color: #a1a1aa;
`;
