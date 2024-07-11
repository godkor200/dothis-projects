import type { Route } from 'next';
import Link from 'next/link';

import { ContactMail } from '@/constants/etc';

import SvgComp from '../SvgComp';

const Footer = () => {
  return (
    <footer className="border-t-grey400 text-grey600   border-t border-solid py-[3rem] pl-[3rem] pr-12 text-[14px] font-[500]">
      <div className="mx-auto max-w-[1548px]">
        <div className="mb-10 flex items-center justify-end">
          <div className="mr-auto">
            <Link href={'/'} title="두디스 홈">
              {/* <SvgComp icon="FooterLogo" width="11.25rem" height="2.5rem" />
               */}
              <p>
                {'('}주{')'}두디스
              </p>
            </Link>
          </div>

          {/* 구글 로그인 인증용 disable */}
          <div className="text-grey900 flex gap-[2.5rem] text-[1.0rem] font-bold">
            <Link href={'/policy'}>
              <span>서비스 이용약관</span>
            </Link>
            <Link href={'/privacy'}>
              <span>개인정보 처리방침</span>
            </Link>

            <Link
              href={
                'https://developers.google.com/terms/api-services-user-data-policy' as Route
              }
              target="_blank"
            >
              <span>공지사항</span>
            </Link>

            <Link
              href={
                'https://developers.google.com/terms/api-services-user-data-policy' as Route
              }
              target="_blank"
            >
              <span>고객센터</span>
            </Link>
            {/*       <Link
            href={
              'https://dothis-world.notion.site/1a7e28e24d3d406399d784da996fa1c8' as Route
            }
          >
            <span>회사소개</span>
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
          </Link> */}
          </div>
        </div>

        <p className="text-grey600 mb-[1.25rem] text-[0.875rem]">
          서울특별시 중구 퇴계로36길 2 | 대표 민상현 | 사업자등록번호
          685-87-02606
          <br />
          두디스 서비스 문의 &nbsp;
          <a href={`mailto:${ContactMail}`}>{ContactMail}</a>
        </p>
        <span className="text-grey500 text-[0.75rem]">
          Copyright ⓒ 2024 Dothis, Inc. All rights reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
