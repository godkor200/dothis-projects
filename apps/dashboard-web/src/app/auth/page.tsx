import { Button } from 'dashboard-storybook/src/components/Button/Button';
import type { Route } from 'next';
import Link from 'next/link';

import { BaseURL } from '@/constants/dev';

const LoginPage = () => {
  return (
    <>
      <h1 className="text-grey700 mb-10  text-center  text-[28px] font-semibold">
        반가워요😊 회원가입을 도와드릴게요! <br /> Let`s Do This!
      </h1>
      <p className="mb-[20px]">Google 계정으로 로그인 (회원가입)</p>

      <Link
        href={(BaseURL + '/v1/auth/google-login') as Route}
        className="mb-[60px]"
      >
        <Button theme="contained" size="L" paddingX="!px-[70px]">
          회원가입
        </Button>
      </Link>
      <p className="text-[14px]">
        계속 진행하기 위해 Google에서 내 이름, 이메일 주소, 언어 환경설정,
        프로필 사진을 <br /> Dothis와 공유합니다. 가입하기 전에{' '}
        <span className="font-bold">개인정보처리방침</span> 및{' '}
        <span className="font-bold">서비스 약관</span>을 검토하세요.
      </p>
    </>
  );
};

export default LoginPage;
