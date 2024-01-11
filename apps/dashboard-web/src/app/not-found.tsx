import { Button } from 'dashboard-storybook/src/components/Button/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="absolute flex h-full w-full flex-col items-center justify-center">
      <h2 className="text-grey500 border-grey500 mb-[1rem] flex h-20  w-20 items-center justify-center rounded-full border-4 text-[48px] font-bold">
        !
      </h2>
      <h2 className="mb-[1rem] text-[48px] font-bold ">404</h2>
      <p className="mb-[0.5rem] text-[26px] font-bold">
        원하시는 페이지를 찾을 수 없습니다.
      </p>
      <div className="text-grey600 mb-[3rem] text-center text-[16px]">
        <p>찾으려는 페이지의 주소가 잘못 입력되었거나,</p>
        <p>주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.</p>
        <p>입력하시 페이지의 주소가 정확한지 다시 한번 확인해 주세요.</p>
      </div>
      <Link href="/contents">
        <Button size="L" theme="contained">
          서비스 홈으로 돌아가기
        </Button>
      </Link>
    </div>
  );
}
