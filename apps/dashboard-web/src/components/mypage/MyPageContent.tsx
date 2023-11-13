'use client';

import { deleteCookie } from 'cookies-next';
import { Button } from 'dashboard-storybook/src/components/Button/Button';
import { useRouter } from 'next/navigation';

import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';

const MyPageContent = () => {
  const { data: userData } = useGetUserInfo();

  const router = useRouter();

  const handleLogOut = () => {
    deleteCookie('refreshToken');
    router.replace('/');
  };

  return (
    <>
      <ul className="mb-[23px] mt-10 flex flex-col gap-[23px]">
        <li className="text-grey700 flex font-bold">
          <p className="w-24">이메일</p> <p>{userData?.userEmail}</p>
        </li>
        <li className="text-grey700 flex font-bold">
          <p className="w-24">회원등급</p> <p>{userData?.plan}</p>
        </li>
        <li className="text-grey700 flex font-bold">
          <p className="w-24">알림</p> <p></p>
        </li>
      </ul>
      <Button size="M" theme="contained" onClick={handleLogOut}>
        로그아웃
      </Button>
    </>
  );
};

export default MyPageContent;
