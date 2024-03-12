'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const StoryboardDetailPage = ({
  params: { storyboard_id },
}: {
  params: { storyboard_id: string };
}) => {
  const router = useRouter();

  return (
    <div className="text-sky flex flex-col items-center gap-[50px] font-bold">
      <p className="text-[30px] text-black">
        스토리보드 디테일 {storyboard_id} 페이지
      </p>
      <p onClick={router.back} className="cursor-pointer">
        뒤로가기
      </p>

      <p className="text-[24px]">스토리보드 디테일 페이지</p>

      <Link href={'?test=1'} replace>
        서치파람 주입
      </Link>

      <Link href={`/storyboard/${storyboard_id}/555`}>
        video artboard 페이지로 이동
      </Link>
    </div>
  );
};

export default StoryboardDetailPage;
