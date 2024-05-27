'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { SVGType } from '@/components/common/SvgComp';
import SvgComp from '@/components/common/SvgComp';
import { cn } from '@/utils/cn';

import * as Style from './styled';

interface Props {
  isSidebarOpen: boolean;
}

const Side = ({ isSidebarOpen }: Props) => {
  return (
    <div className=" border-r-1 border-r-grey400">
      <div
        className={cn(
          'flex h-screen w-[240px] flex-shrink-0 flex-col gap-[62px] pt-[40px] transition-all duration-75',
          {
            'w-[79px]': !isSidebarOpen,
          },
        )}
      >
        {isSidebarOpen ? (
          <>
            <DashboardList title="대시보드" menuList={SIDE_MENUS} />

            <DashboardList title="서비스" menuList={SIDE_MENUS2} />
          </>
        ) : (
          <>
            <IconList menuList={SIDE_MENUS} />
            <IconList menuList={SIDE_MENUS2} />
          </>
        )}
      </div>
    </div>
  );
};

export default Side;

const DashboardList = ({
  title,
  menuList,
}: {
  title: string;
  menuList: SideMenus[];
}) => {
  const pathName = usePathname();

  return (
    <ul className="pl-[18px]">
      <p className="mb-[18px] text-[14px] font-bold">{title}</p>
      <div className="flex flex-col gap-[14px]">
        {menuList.map((item) => (
          <Link href={item.link} key={item.title}>
            <Style.SideItemContainer
              $isInActive={`/${pathName?.split('/')[1]}` === item.link}
              key={item.title}
            >
              <SvgComp icon={item.icon} size={24} />
              <p>{item.title}</p>
            </Style.SideItemContainer>
          </Link>
        ))}
      </div>
    </ul>
  );
};

const IconList = ({ menuList }: { menuList: SideMenus[] }) => {
  const pathName = usePathname();

  return (
    <ul className="px-[12px] pt-[39px]">
      <div className="flex flex-col gap-[14px]">
        {menuList.map((item) => (
          <Link href={item.link} key={item.title}>
            <Style.IconItemContainer
              $isInActive={`/${pathName?.split('/')[1]}` === item.link}
              key={item.title}
            >
              <SvgComp icon={item.icon} size={24} />
            </Style.IconItemContainer>
          </Link>
        ))}
      </div>
    </ul>
  );
};

interface SideMenus {
  title: string;
  icon: SVGType;
  link: Route;
}

const SIDE_MENUS: SideMenus[] = [
  {
    title: '콘텐츠 소재',
    icon: 'SideMain',
    link: '/keyword',
  },
  {
    title: '내 채널 분석',
    icon: 'SideChannel',
    link: '/channel',
  },
  {
    title: '인기 키워드 분석',
    icon: 'SideTrend',
    link: '/trendingsearches',
  },
];

const SIDE_MENUS2: SideMenus[] = [
  {
    title: '커뮤니티',
    icon: 'SideCommunity',
    link: '/community',
  },
  {
    title: '멤버십',
    icon: 'SideMembership',
    link: '/membership',
  },
  {
    title: '블로그',
    icon: 'SideBlog',
    link: '/blog/views-count',
  },
  {
    title: '도움말',
    icon: 'SideHelp',
    link: '/help',
  },
];
