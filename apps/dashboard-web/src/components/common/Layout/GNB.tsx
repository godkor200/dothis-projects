'use client';

import type { Route } from 'next';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import SvgComp from '@/components/common/SvgComp';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';

// Header 반응형 디자인이나 기획이 나오면 반응형 대응 예정
const GNB = () => {
  const isSignedIn = useIsSignedIn();
  const { setIsOpenSignUpModal } = useAuthActions();

  const router = useRouter();

  const checkIsSignedIn = () => {
    if (isSignedIn) return true;
    setIsOpenSignUpModal(true);
    router.push('/contents?steps=signUp');
    return false;
  };

  const handleRouter = (route: Route) => {
    if (!checkIsSignedIn()) return;
    // router.push(route);
    alert(`${route}로 이동`);
  };

  return (
    <header className="border-grey300 relative box-border flex h-[5.5rem] w-full items-center justify-center border-b border-solid p-5">
      {/* 이 부분은 Hover 디자인과 클릭 시 기능을 파악하고 추가 작업 */}

      <div className="desktop:gap-[0.75rem] absolute right-12 flex gap-[0.25rem]">
        <div
          className="rounded-8 bg-primary100 hover:bg-grey300 ml-3 flex cursor-pointer items-center p-3"
          onClick={() => handleRouter('/about')}
        >
          <SvgComp icon="HeaderEdit" size="1.5rem" />
        </div>
        <div
          className="rounded-8 hover:bg-grey300 cursor-pointer p-3"
          onClick={() => handleRouter('/pricing')}
        >
          <SvgComp icon="HeaderTicket" size="1.5rem" />
        </div>
        <div
          className="rounded-8 hover:bg-grey300 cursor-pointer p-3"
          onClick={() => handleRouter('/about')}
        >
          <SvgComp icon="HeaderNotification" size="1.5rem" />
        </div>
        <div
          className="border-grey300 rounded-8 bg-grey300 hover:bg-grey600 cursor-pointer p-3"
          onClick={() => handleRouter('/mypage')}
        >
          <SvgComp icon="HeaderUserProfile" size="1.5rem" />
        </div>
      </div>
    </header>
    );
};
export default GNB;
