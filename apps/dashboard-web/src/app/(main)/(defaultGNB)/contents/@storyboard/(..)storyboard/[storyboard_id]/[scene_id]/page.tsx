'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SceneDetailPage_Intercepting = ({
  params: { scene_id },
}: {
  params: { scene_id: string };
}) => {
  const router = useRouter();

  return (
    <div className="text-sky border-grey700 flex flex-col items-center gap-[50px]  border-2 font-bold">
      <p className="text-[30px] text-black">영상 아트보드 {scene_id} 페이지</p>
      <p onClick={router.back} className="cursor-pointer">
        뒤로가기
      </p>

      <p className="text-[24px]">영상 아트보드 페이지</p>

      <Link href={'?test=1'}> 서치파람 주입</Link>
    </div>
  );
};

export default SceneDetailPage_Intercepting;
