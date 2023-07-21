import { Button } from 'dashboard-storybook/src/stories/Button';
import Link from 'next/link';

const page = () => {
  return (
    <>
      <Link className="mt-10" href="/login/choose-keyword">
        로딩 테스트
      </Link>

      <Button label="대쉬보드 스토리북 테스트 버튼" />
    </>
  );
};
export default page;
