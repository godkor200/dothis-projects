'use client'; // Error components must be Client Components

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  console.log(error.name);
  console.log(error.message);

  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center">
      <h2 className="text-grey500 border-grey500 mb-[1rem] flex h-20  w-20 items-center justify-center rounded-full border-4 text-[48px] font-bold">
        !
      </h2>
      <p className="mb-[0.5rem] text-[26px] font-bold">
        서비스에 접속할 수 없습니다.
      </p>
      <div className="text-grey600 mb-[3rem] text-center text-[16px]">
        <p>죄송합니다. 기술적인 문제로 일시적으로 접속되지 않았습니다.</p>
        <p>잠시 후 다시 확인해주세요.</p>
      </div>
      <Link href="/contents">
        <Button size="L" theme="contained">
          서비스 홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
