import Link from 'next/link';

import GoogleBtn from '@/components/Login/GoogleBtn';
import SvgComp from '@/components/share/SvgComp';

function LoginPage() {
  return (
    <div className="flex  items-center flex-col pt-14">
      <SvgComp icon="LogoSvg" width={80} />

      <h2 className="mt-10 text-2xl font-bold ">
        간편 로그인으로 내 채널 분석까지
      </h2>
      <p className="mt-3 text-gray-500">
        빅데이터 기반 콘텐츠 키워드 분석 플랫폼 ‘두디스’
      </p>

      <GoogleBtn />

      <p className="mt-14 text-slate-200 text-xs">
        Copyright © 2023 Dothis Corp. All rights reserved.
      </p>
    </div>
  );
}

export default LoginPage;
