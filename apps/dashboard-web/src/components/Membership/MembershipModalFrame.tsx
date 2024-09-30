'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import type { SVGType } from '@/components/common/SvgComp';
import useQueryString from '@/hooks/useQueryString';
import { useModalActions } from '@/store/modalStore';

import SvgComp from '../common/SvgComp';

interface Menus {
  title: string;
  icon: SVGType;
}

const MENUS: Menus[] = [
  {
    title: '무제한 키워드 분석',
    icon: 'SideMain',
  },
  {
    title: '무제한 연관어 분석',
    icon: 'SideChannel',
  },
  {
    title: '분석 결과 비교',
    icon: 'SideTrend',
  },
  {
    title: 'SNS/커뮤니티 분석',
    icon: 'SideMagicPen',
  },
];

const MembershipModalFrame = ({
  hasDismissButton,
}: {
  hasDismissButton?: boolean;
}) => {
  const router = useRouter();

  const { initializeModal } = useModalActions();

  /**
   * 해당 paymentPage 를 searchparams으로 바꿔볼까 헀지만, 충돌나는 부분이 많아서 그냥 state로 제어
   * @bug RouterModal에 걸어둔 router.back 과 initialModal이 searchParams을 사용하면 기대했던 1뎁스만 back이 되어서 다시 modal이 켜지지 않음
   * @bug 추측 ) Router searchparams으로 제어 시 intercepting Route 가 재실행되어서 문제가 생기지 않을까?
   */
  const [isPaymentPage, setIsPaymentpage] = useState(false);

  const { createUrlWithQueryString } = useQueryString();

  const searchParams = useSearchParams();

  return (
    <div className="border-grey400 relative mx-auto flex w-[600px] flex-col  items-center rounded-[30px] border bg-white px-[100px] ">
      {hasDismissButton && (
        <SvgComp
          icon="Close"
          size={24}
          className="absolute right-[24px] top-[24px] cursor-pointer"
          onClick={() => {
            initializeModal();
            router.back();
          }}
        />
      )}
      <div className="mb-[84px] mt-[100px] flex items-center gap-[12px] ">
        <SvgComp icon="SideLogo" size={50} />
        <SvgComp icon="LogoTitle" width={170} height={70} />
      </div>
      {false ? (
        <>
          <p className="text-[20px] font-bold ">결제수단 선택</p>

          <div className="flex w-full flex-1 justify-between">
            <div className="">
              <p>네이버페이</p>
            </div>
            <div>
              <p>카카오페이</p>
            </div>
            <div>
              <p>일반 카드</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="border-primary500 rounded-8 relative mb-3 w-full overflow-hidden border ">
            <p className="bg-primary500 border-primary500    mb-[10px] h-full  w-full text-center font-bold text-white">
              런칭 이벤트
            </p>
            <div className="px-[20px] pb-[20px]">
              <p className="text-grey900 text-center text-[20px]  font-bold">
                Basic
              </p>
              <div className="bg-grey300 my-[20px] h-[1px] w-full" />

              <p className="text-primary500 text-center text-[20px]  font-bold">
                14,850원 / 월
              </p>
              <p className="text-grey900 text-center text-[20px]  font-bold line-through">
                29,700원 / 월
              </p>
            </div>
          </div>

          <p className="text-grey600 mb-[50px] text-[14px] font-[500]">
            이벤트 종료 30일 전에 미리 알려드리겠습니다!
          </p>

          {MENUS.map((item, index) => (
            <div
              className="mb-[18px] flex w-[165px] gap-[10px]"
              key={item.title + index}
            >
              <SvgComp
                icon={item.icon}
                size={24}
                className="[&_path]:stroke-grey500 [&_path]:fill-none [&_path]:stroke-2"
              />
              <p className="text-grey600 font-bold"> {item.title}</p>
            </div>
          ))}
        </>
      )}

      <button
        className="bg-primary500 rounded-10 my-[20px] w-full cursor-pointer py-4 text-center font-bold text-white focus:outline-none"
        // onClick={() => setIsPaymentpage(true)}
        onClick={() => {
          initializeModal();
          router.back();
        }}
      >
        결제하기
      </button>

      <div className="text-grey500 mb-[52px] flex items-center gap-[6px] text-[12px] font-[500]">
        <Link href={'/policy'}>이용 약관</Link>
        <div className="bg-grey400  h-[12px] w-[1px]" />

        <Link href={'/privacy'}>개인정보 처리방침</Link>
      </div>
    </div>
  );
};

export default MembershipModalFrame;
