'use client';

import { theme } from '@dothis/theme/dashboard';
import styled from 'styled-components';

import SvgComp from '@/components/share/SvgComp';
import { SIDE_MENUS } from '@/constants/SideMenus';

import * as Style from './style';

// SVG 파일 색채우기 필요함 (채워본적 없어서 보류)
// transition은 추후에 변경 생각 중

const SideBar = () => {
  return (
    <Style.Container>
      <SvgComp icon="SideLogo" size={50} />
      <Style.IconContainer>
        {SIDE_MENUS.map((item) => (
          <Style.IconWrapper>
            <Style.IconBox>
              <SvgComp icon={item.icon} size={24} />
            </Style.IconBox>
            <Style.SideText>{item.title}</Style.SideText>
          </Style.IconWrapper>
        ))}
      </Style.IconContainer>
    </Style.Container>
  );
};
export default SideBar;
