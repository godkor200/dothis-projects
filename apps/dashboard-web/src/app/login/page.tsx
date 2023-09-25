import Link from 'next/link';

import GoogleBtn from '@/components/Login/GoogleBtn';
import SvgComp from '@/share/SvgComp';

const LoginPage = () => {
  return (
    <div className="flex  flex-col items-center pt-14">
      <SvgComp icon="LogoSvg" width={80} />

      <h2 className="text-grey900 mt-10 text-[1.5rem] font-bold ">
        간편 로그인으로 내 채널 분석까지
      </h2>
      <p className="text-grey600 mt-3">
        빅데이터 기반 콘텐츠 키워드 분석 플랫폼 ‘두디스’
      </p>

      <GoogleBtn />

      <p className="text-grey200 mt-14 text-[0.75rem]">
        Copyright © 2023 Dothis Corp. All rights reserved.
      </p>
    </div>
  );
};

export default LoginPage;
