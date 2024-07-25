'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { OAUTH_DATA } from '@/constants/oauth';
import { useModalActions } from '@/store/modalStore';

import SvgComp from '../common/SvgComp';
import LoginButton from './LoginButton';

const LoginFrame = ({ hasDismissButton }: { hasDismissButton?: boolean }) => {
  const router = useRouter();

  const { initializeModal } = useModalActions();

  return (
    <div className="border-grey400 relative mx-auto flex w-[600px] flex-col  items-center rounded-[30px] border bg-white px-[100px] ">
      {hasDismissButton && (
        <SvgComp
          icon="Close"
          size={24}
          className="absolute right-[24px] top-[24px] cursor-pointer"
          onClick={() => {
            initializeModal();
            router.back();
          }}
        />
      )}
      <div className="mb-[84px] mt-[100px] flex items-center gap-[12px]">
        <SvgComp icon="SideLogo" size={50} />
        <SvgComp icon="LogoTitle" width={170} height={70} />
      </div>

      <p className="text-grey900 mb-[84px] text-[18px] font-[500]">
        Google 계정으로 Dothis에 로그인합니다
      </p>

      <p className="text-grey900 mb-[20px] font-[500]">간편 로그인</p>

      {OAUTH_DATA.map(({ iconName, title, colorSchemeName }) => {
        return (
          <LoginButton
            iconName={iconName}
            aria-label={title}
            boderColor={colorSchemeName}
            key={title}
          />
        );
      })}

      <span className="text-grey600 mb-[120px] text-[14px] font-[500]">
        신규 로그인은 회원가입이 함께 진행됩니다
      </span>

      <div className="text-grey500 mb-[52px] flex items-center gap-[6px] text-[12px] font-[500]">
        <Link href={'/policy'}>이용 약관</Link>
        <div className="bg-grey400  h-[12px] w-[1px]" />

        <Link href={'/privacy'}>개인정보 처리방침</Link>
      </div>
    </div>
  );
};

export default LoginFrame;
