'use client';

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import SvgComp from '@/components/common/SvgComp';
import { SIDE_MENUS } from '@/constants/SideMenus';

import * as Style from './style';

// SVG 파일 색채우기 필요함 (채워본적 없어서 보류)
// transition은 추후에 변경 생각 중

const SideBar = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <Style.Container>
      <div className="cursor-pointer" onClick={() => router.push('/contents')}>
        <SvgComp icon="SideLogo" size={40} />
      </div>
      <div className="flex flex-col gap-[2.5rem]">
        {SIDE_MENUS.map((item, index) => (
          <Style.IconWrapper $isInActive={pathName !== item.link} key={index}>
            <Style.IconBox>
              <SvgComp icon={item.icon} size={16} />
            </Style.IconBox>
            <Style.SideText>{item.title}</Style.SideText>
          </Style.IconWrapper>
        ))}
      </div>
    </Style.Container>
  );
};
export default SideBar;
