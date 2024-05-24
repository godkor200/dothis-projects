'use client';

import type { Route } from 'next';
import { usePathname } from 'next/navigation';

import type { SVGType } from '@/components/common/SvgComp';
import SvgComp from '@/components/common/SvgComp';

import * as Style from './styled';

interface Props {
  isSidebarOpen: boolean;
}

const Side = ({ isSidebarOpen }: Props) => {
  return (
    <div className=" border-r-1 border-r-grey400">
      {isSidebarOpen ? (
        <div className=" flex h-screen w-[240px] flex-shrink-0 flex-col gap-[62px] pt-[40px]">
          <DashboardList title="대시보드" menuList={SIDE_MENUS} />

          <DashboardList title="서비스" menuList={SIDE_MENUS2} />
        </div>
      ) : (
        <div className="flex h-screen w-[79px] flex-shrink-0 flex-col gap-[62px] pt-[40px]">
          <IconList menuList={SIDE_MENUS} />
          <IconList menuList={SIDE_MENUS2} />
        </div>
      )}
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
          <Style.SideItemContainer
            $isInActive={pathName === item.link}
            key={item.title}
          >
            <SvgComp icon={item.icon} size={24} />
            <p>{item.title}</p>
          </Style.SideItemContainer>
        ))}
      </div>
    </ul>
  );
};

const IconList = ({ menuList }: { menuList: SideMenus[] }) => {
  const pathName = usePathname();

  return (
    <ul className="px-[12px]">
      <div className="flex flex-col gap-[14px]">
        {menuList.map((item) => (
          <Style.IconItemContainer
            $isInActive={pathName === item.link}
            key={item.title}
          >
            <SvgComp icon={item.icon} size={24} />
          </Style.IconItemContainer>
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
    title: '콘텐츠 키워드 찾기',
    icon: 'SideMain',
    link: '/contents',
  },
  {
    title: '내 채널 분석',
    icon: 'SideUser',
    link: '/preparing',
  },
  {
    title: '키워드 순위 분석',
    icon: 'SideTrendUp',
    link: '/trending',
  },
  {
    title: '커뮤니티',
    icon: 'SideMessage',
    link: '/preparing',
  },
];

const SIDE_MENUS2: SideMenus[] = [
  {
    title: '커뮤니티',
    icon: 'SideMessage',
    link: '/preparing',
  },
  {
    title: '멤버십',
    icon: 'SideUser',
    link: '/preparing',
  },
  {
    title: '블로그',
    icon: 'SideTrendUp',
    link: '/trending',
  },
  {
    title: '도움말',
    icon: 'SideTrendUp',
    link: '/trending',
  },
];
