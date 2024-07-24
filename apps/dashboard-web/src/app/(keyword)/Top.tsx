'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Dispatch, SetStateAction } from 'react';

import SvgComp from '@/components/common/SvgComp';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import { useAuthActions, useIsSignedIn } from '@/store/authStore';
import { cn } from '@/utils/cn';

import GNBSearchbar from './GNBSearchbar';

interface Props {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Top = ({ isSidebarOpen, setIsSidebarOpen }: Props) => {
  const isSignedIn = useIsSignedIn();

  const { data } = useGetUserInfo();

  const pathName = usePathname();

  const currentPath = `/${pathName?.split('/')[1]}`;

  return (
    <div
      className={cn(
        'border-b-1 border-b-grey400 flex min-w-[1672px] items-center',
        {
          'min-w-[1511px]': !isSidebarOpen,
        },
      )}
    >
      <div className="mr-[66px] flex items-center gap-[53px]">
        <Link href={'/'}>
          <div className="my-[24px] ml-[28px] flex cursor-pointer items-center gap-[8px]">
            {/* <SvgComp icon="SideLogo" size={30} /> */}
            <div className="relative h-[32px] w-[27px]">
              <Image src={'/RefactLogo.png'} fill={true} alt="mainlogo" />
            </div>
            <SvgComp icon="LogoTitle" width={100} height={40} />
          </div>
        </Link>

        <SvgComp
          icon="ArrowLeft"
          size={24}
          style={{
            transform: isSidebarOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
          className="cursor-pointer"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        />
      </div>

      <GNBSearchbar />

      <div className="ml-auto mr-[66px] flex items-center gap-[23px]">
        {isSignedIn ? (
          <>
            <div className="bg-primary100 rounded-8 flex  cursor-pointer items-center p-3 pr-4">
              <SvgComp
                icon="HeaderEdit"
                size={26}
                className="[&_path]:stroke-primary500 mr-3"
              />
              <p className="text-grey900 text-[14px] font-bold">스토리보드</p>
            </div>

            <SvgComp
              icon="HeaderNotification"
              size={24}
              className="[&_path]:stroke-grey500 cursor-pointer"
            />
            <div className="bg-grey300 h-[40px]  w-[1px]" />

            <div className="flex items-center gap-[10px]">
              <div className="rounded-8 bg-grey200 cursor-pointer p-3">
                <SvgComp
                  icon="HeaderUserProfile"
                  size={24}
                  className="[&_path]:stroke-grey400 [&_path]:fill-grey400"
                />
              </div>

              <div>
                <p className="text-grey900 text-[14px]">{data?.userEmail}</p>
                <p className="text-grey500 text-[12px]">{data?.plan}</p>
              </div>
            </div>
          </>
        ) : (
          <Link href={`/login?previous_url=${currentPath}`}>
            <div className="text-grey700 rounded-8 bg-primary100  px-[52px]  py-[13px] text-[14px] font-bold">
              로그인
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Top;
