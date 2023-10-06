'use client';

import { usePathname } from 'next/navigation';

import { SIDE_MENUS } from '@/constants/SideMenus';
import SvgComp from '@/share/SvgComp';

import * as Style from './style';

// SVG 파일 색채우기 필요함 (채워본적 없어서 보류)
// transition은 추후에 변경 생각 중

const SideBar = () => {
  const pathName = usePathname();

  return (
    <Style.Container>
      <SvgComp icon="SideLogo" size={50} />
      <div className="flex flex-col gap-[2.5rem]">
        {SIDE_MENUS.map((item, index) => (
          <Style.IconWrapper $isInActive={pathName !== item.link} key={index}>
            <Style.IconBox>
              <SvgComp icon={item.icon} size={24} />
            </Style.IconBox>
            <Style.SideText>{item.title}</Style.SideText>
          </Style.IconWrapper>
        ))}
      </div>
    </Style.Container>
  );
};
export default SideBar;
