import type { SVGType } from '@/components/common/SvgComp';

interface SideMenus {
  title: string;
  icon: SVGType;
  link: string;
}

export const SIDE_MENUS: SideMenus[] = [
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
    link: '/preparing',
  },
  {
    title: '커뮤니티',
    icon: 'SideMessage',
    link: '/preparing',
  },
];

interface GNBMenus {
  icon: SVGType;
  link: string;
}

export const GNB_MENUS: GNBMenus[] = [
  {
    icon: 'HeaderEdit',
    link: '/about',
  },
  {
    icon: 'HeaderTicket',
    link: '/pricing',
  },
  {
    icon: 'HeaderNotification',
    link: '/about',
  },
  {
    icon: 'HeaderUserProfile',
    link: '/mypage',
  },
];
