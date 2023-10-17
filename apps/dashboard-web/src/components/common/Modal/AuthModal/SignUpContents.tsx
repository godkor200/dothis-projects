'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import SvgComp from '@/share/SvgComp';

const SignUpContents = () => {
  const router = useRouter();
  return (
    <div className=" rounded-8 bg-grey00 border-grey400 w-[500px] border border-solid p-10">
      <div className="flex justify-end" onClick={() => router.back()}>
        <SvgComp icon="Close" size={24} />
      </div>
      <p className="text-t3 text-grey700 mb-5 text-center font-bold">
        간편가입 후 이용할 수 있어요 <br />
        (3초면 가입 끝!)
      </p>
      <div className="flex justify-center gap-[1.25rem]">
        <Link href={'/login'} replace>
          <Button theme="outlined" size="L">
            로그인
          </Button>
        </Link>
        <Link href={'/login'} replace>
          <Button theme="contained" size="L">
            회원가입
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpContents;
