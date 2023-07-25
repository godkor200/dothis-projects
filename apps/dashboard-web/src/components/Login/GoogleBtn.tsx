import Link from 'next/link';

import SvgComp from '../../share/SvgComp';

const GoogleBtn = () => {
  return (
    <Link
      className="w-full block mt-[3.75rem]"
      href="https://api.dothis.kr/v1/auth/google-login"
    >
      <div className="w-full flex justify-center items-center py-4 border-solid border border-grey200 rounded-lg text-center">
        <button className="inline-flex gap-[0.7rem]">
          <SvgComp icon="GoogleSvg" size={26} />
          <p className="text-grey900 font-bold">Google 로그인</p>
        </button>
      </div>
    </Link>
  );
};

export default GoogleBtn;
