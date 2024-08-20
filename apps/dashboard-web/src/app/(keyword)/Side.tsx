'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import type { SVGType } from '@/components/common/SvgComp';
import SvgComp from '@/components/common/SvgComp';
import usePathNameList from '@/hooks/usePathNameList';
import useQueryString from '@/hooks/useQueryString';
import { useIsSignedIn } from '@/store/authStore';
import { useIsRouterModalOpen } from '@/store/modalStore';
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
          'flex h-[calc(100vh-90px)] w-[240px] flex-shrink-0 flex-col gap-[62px] pt-[40px] transition-all duration-75',
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

  const searchParams = useSearchParams();

  const currentPath = `/${pathName?.split('/')[1]}`;

  const { createUrlWithQueryString } = useQueryString();

  const isSignedIn = useIsSignedIn();

  const INTERCEPTING_ROUTE_OPTIONS: Route[] = ['/membership', '/login'];

  const isInterceptingRoute = (targetLink: Route) =>
    INTERCEPTING_ROUTE_OPTIONS.includes(targetLink);

  const handleInterCeptingRoute = (targetLink: Route) => {
    if (isInterceptingRoute(targetLink)) {
      return createUrlWithQueryString({
        route: targetLink,
        name: 'previous_url',
        value: currentPath,
      });
    }
    return targetLink;
  };

  const isEnableRouterScroll = (targetLink: Route) => {
    return isInterceptingRoute(targetLink) && !isSignedIn ? false : true;
  };

  const isRouterModalOpen = useIsRouterModalOpen();

  const isCurrentIntercepting = isRouterModalOpen;

  return (
    <ul className="pl-[18px]">
      <p className="mb-[18px] text-[14px] font-bold">{title}</p>
      <div className="flex flex-col gap-[14px]">
        {menuList.map((item) => {
          return (
            <Link
              href={handleInterCeptingRoute(item.link)}
              key={item.title}
              scroll={isEnableRouterScroll(item.link)}
            >
              <Style.SideItemContainer
                $isInActive={
                  isInterceptingRoute(currentPath as Route)
                    ? isCurrentIntercepting
                      ? item.active.includes(
                          searchParams
                            ?.get('previous_url')
                            ?.split('/')
                            .filter(Boolean).length
                            ? (`/${
                                searchParams
                                  ?.get('previous_url')
                                  ?.split('/')
                                  .filter(Boolean)[0]
                              }` as Route)
                            : `/`,
                        )
                      : item.active.includes(
                          `/${pathName?.split('/')[1]}` as Route,
                        )
                    : item.active.includes(
                        `/${pathName?.split('/')[1]}` as Route,
                      )
                }
                key={item.title}
              >
                <SvgComp icon={item.icon} size={24} />
                <p>{item.title}</p>
              </Style.SideItemContainer>
            </Link>
          );
        })}
      </div>
    </ul>
  );
};

const IconList = ({ menuList }: { menuList: SideMenus[] }) => {
  const searchParams = useSearchParams();

  const pathNameList = usePathNameList();

  const currentPath = pathNameList?.length ? `/${pathNameList[0]}` : '/';

  const { createUrlWithQueryString } = useQueryString();

  const isSignedIn = useIsSignedIn();

  const INTERCEPTING_ROUTE_OPTIONS: Route[] = ['/membership', '/login'];

  const isInterceptingRoute = (targetLink: Route) =>
    INTERCEPTING_ROUTE_OPTIONS.includes(targetLink);

  const handleInterCeptingRoute = (targetLink: Route) => {
    if (isInterceptingRoute(targetLink)) {
      return createUrlWithQueryString({
        route: targetLink,
        name: 'previous_url',
        value: currentPath,
      });
    }
    return targetLink;
  };

  const isEnableRouterScroll = (targetLink: Route) => {
    return isInterceptingRoute(targetLink) && !isSignedIn ? false : true;
  };

  const isRouterModalOpen = useIsRouterModalOpen();

  const isCurrentIntercepting = isRouterModalOpen;
  return (
    <ul className="px-[12px] pt-[39px]">
      <div className="flex flex-col gap-[14px]">
        {menuList.map((item) => (
          <Link
            href={handleInterCeptingRoute(item.link)}
            key={item.title}
            scroll={isEnableRouterScroll(item.link)}
          >
            <Style.IconItemContainer
              $isInActive={
                isInterceptingRoute(currentPath as Route)
                  ? isCurrentIntercepting
                    ? item.active.includes(
                        searchParams
                          ?.get('previous_url')
                          ?.split('/')
                          .filter(Boolean).length
                          ? (`/${
                              searchParams
                                ?.get('previous_url')
                                ?.split('/')
                                .filter(Boolean)[0]
                            }` as Route)
                          : `/`,
                      )
                    : item.active.includes(currentPath as Route)
                  : item.active.includes(currentPath as Route)
              }
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
  active: Route[];
}

const SIDE_MENUS: SideMenus[] = [
  {
    title: '키워드 분석',
    icon: 'SideMain',
    link: '/',
    active: ['/', '/keyword' as Route, '%2F' as Route],
  },
  {
    title: '내 채널 분석',
    icon: 'SideChannel',
    link: '/channel',
    active: ['/channel'],
  },
  {
    title: '주간 트렌드',
    icon: 'SideTrend',
    link: '/rank',
    active: ['/rank'],
  },
];

const SIDE_MENUS2: SideMenus[] = [
  {
    title: '커뮤니티',
    icon: 'SideCommunity',
    link: '/community',
    active: ['/community'],
  },
  {
    title: '멤버십',
    icon: 'SideMembership',
    link: '/membership',
    active: ['/membership'],
  },
  {
    title: '블로그',
    icon: 'SideBlog',
    link: '/blog/views-count',
    active: ['/blog/views-count'],
  },
  {
    title: '도움말',
    icon: 'SideHelp',
    link: '/help',
    active: ['/help'],
  },
];
