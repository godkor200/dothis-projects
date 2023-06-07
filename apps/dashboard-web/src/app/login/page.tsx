'use client';
import type { Route } from 'next';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import SvgComp from '@/components/share/SvgComp';

function LoginPage() {
  let goo_Url = 'www.naver.com';

  const router = useRouter();
  return (
    <div>
      로그인
      <br />
      <SvgComp icon="LogoSvg" size={60} />
      <p></p>
      <button onClick={() => signIn('google')}>
        <span>구글로 시작하기</span>
      </button>
    </div>
  );
}

export default LoginPage;
