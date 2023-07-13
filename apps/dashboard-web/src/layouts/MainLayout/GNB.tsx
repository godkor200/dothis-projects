'use client';

import { theme } from '@dothis/theme/dashboard/index';
import styled from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

import * as Style from './style';

// Header 반응형 디자인이나 기획이 나오면 반응형 대응 예정
function GNB() {
  return (
    <Style.GNBContainer>
      <Style.SearchInputWrapper>
        <Style.SearchInput placeholder="키워드를 넣어주세요" />
        <Style.SearchIconWrapper>
          <SvgComp icon="HeaderPlus" size="2rem" />
        </Style.SearchIconWrapper>
      </Style.SearchInputWrapper>
      <Style.UnknownIconWrapper>
        <SvgComp icon="HeaderEdit" size="1.5rem" />
      </Style.UnknownIconWrapper>

      {/* 이 부분은 Hover 디자인과 클릭 시 기능을 파악하고 추가 작업 */}
      <Style.UserGNBWrapper>
        <Style.UserGNBIconWrapper>
          <SvgComp icon="HeaderTicket" size="1.5rem" />
        </Style.UserGNBIconWrapper>
        <Style.UserGNBIconWrapper>
          <SvgComp icon="HeaderNotification" size="1.5rem" />
        </Style.UserGNBIconWrapper>
        <Style.UserGNBIconWrapper>
          <SvgComp icon="HeaderUserProfile" size="1.5rem" />
        </Style.UserGNBIconWrapper>
      </Style.UserGNBWrapper>
    </Style.GNBContainer>
  );
}
export default GNB;
