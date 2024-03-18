'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const StoryboardPage_Intercepting = () => {
  const router = useRouter();
  return (
    <div className="text-yellow flex flex-col items-center gap-[40px]">
      <p className="text-[30px] font-bold text-black">
        스토리보드 리스트 페이지
      </p>

      <p onClick={router.back} className="cursor-pointer">
        뒤로가기
      </p>

      <Link href={`/storyboard/333`}>id로 이동</Link>
    </div>
  );
};

export default StoryboardPage_Intercepting;
