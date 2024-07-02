'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const Page = () => {
  const searchParam = useSearchParams();

  const data = searchParam?.get('test');

  return (
    <div>
      <p className="font-bold"> 테스트용 페이지</p>

      <div>{data}</div>
      <Link
        href={'/photos'}
        className="text-green flex justify-center text-[40px]"
      >
        스토리보드 사이드 시트 열기
      </Link>
    </div>
  );
};

export default Page;
