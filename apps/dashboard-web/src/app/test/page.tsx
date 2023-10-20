'use client';

import { Button } from 'dashboard-storybook/src/components/Button/Button';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <Link className="mt-10" href="/login/choose-keyword">
        로딩 테스트
      </Link>

      <Button size="M" theme="primary" paddingX="!px-[30px]">
        대쉬보드 스토리북 테스트 버튼
      </Button>
    </>
  );
};
export default page;
