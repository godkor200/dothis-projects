import Link from 'next/link';

import GoogleBtn from '@/components/Login/GoogleBtn';
import SvgComp from '@/share/SvgComp';

const LoginPage = () => {
  return (
    <div className="flex  items-center flex-col pt-14">
      <SvgComp icon="LogoSvg" width={80} />

      <h2 className="mt-10 text-[1.5rem] font-bold text-grey900 ">
        간편 로그인으로 내 채널 분석까지
      </h2>
      <p className="mt-3 text-grey600">
        빅데이터 기반 콘텐츠 키워드 분석 플랫폼 ‘두디스’
      </p>

      <GoogleBtn />

      <p className="mt-14 text-grey200 text-[0.75rem]">
        Copyright © 2023 Dothis Corp. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
