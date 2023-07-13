import type { SVGType } from '@/components/share/SvgComp';

interface SideMenus {
  title: string;
  icon: SVGType;
  link: string;
}

export const SIDE_MENUS: SideMenus[] = [
  {
    title: '콘텐츠 키워드 찾기',
    icon: 'SideMain',
    link: '/chart',
  },
  {
    title: '인기 영상 분석',
    icon: 'SideMagicPen',
    link: '/chart',
  },
  {
    title: '내 채널 분석',
    icon: 'SideUser',
    link: '/chart',
  },
  {
    title: '인기 키워드 분석',
    icon: 'SideTrendUp',
    link: '/chart',
  },
  {
    title: '커뮤니티',
    icon: 'SideMessage',
    link: '/chart',
  },
];
