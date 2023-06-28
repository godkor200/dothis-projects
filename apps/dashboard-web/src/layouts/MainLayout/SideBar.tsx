'use client';

import { theme } from '@dothis/theme/dashboard';
import { styled } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

// SVG 파일 색채우기 필요함 (채워본적 없어서 보류)
// transition은 추후에 변경 생각 중
function SideBar() {
  return (
    <Container>
      <SvgComp icon="SideLogo" size={50} />
      <IconContainer>
        <IconWrapper>
          <IconBox>
            <SvgComp icon="SideMain" size={24} />
          </IconBox>
          <SideText>콘텐츠 키워드 찾기</SideText>
        </IconWrapper>
        <IconWrapper>
          <IconBox>
            <SvgComp icon="SideMagicPen" size={24} />
          </IconBox>
          <SideText>인기 영상 분석</SideText>
        </IconWrapper>
        <IconWrapper>
          <IconBox>
            <SvgComp icon="SideUser" size={24} />
          </IconBox>
          <SideText>내 채널 분석</SideText>
        </IconWrapper>
        <IconWrapper>
          <IconBox>
            <SvgComp icon="SideTrendUp" size={24} />
          </IconBox>
          <SideText>인기 키워드 분석</SideText>
        </IconWrapper>
        <IconWrapper>
          <IconBox>
            <SvgComp icon="SideMessage" size={24} />
          </IconBox>
          <SideText>커뮤니티</SideText>
        </IconWrapper>
      </IconContainer>
    </Container>
  );
}
export default SideBar;

const IconBox = styled.div`
  padding: 0.75rem;
  border-radius: 0.5rem;

  background-color: white;
  box-shadow: 0px 0px 0px 1px ${theme.colors.grey10};
`;

const SideText = styled.span`
  padding-top: 0.75rem;
  padding-left: 1.25rem;

  color: ${theme.colors.grey30};

  visibility: hidden;
  opacity: 0;

  white-space: nowrap;
`;

const IconWrapper = styled.div`
  display: flex;

  width: 3.125rem;
  height: 3.125rem;

  &:hover {
    padding: 0.75rem;
    border-radius: 0.5rem;

    background-color: ${theme.colors.primary10};
    box-shadow: 0px 0px 0px 1px ${theme.colors.grey10};
    transition: none;

    ${IconBox} {
      padding: 0;
      border-radius: 0;

      background-color: ${theme.colors.primary10};

      box-shadow: 0 0 0 0;
      transition: none;
    }
    ${SideText} {
      padding-top: 0;
      padding-left: 2rem;
      /* IconBox padding이 없어지다보니 rem값을 추가해주었다. */
      transition: none;
    }
  }
`;

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 7.5rem;

  position: fixed;

  width: 6rem;
  height: 100vh;

  padding: 1.5rem;
  border-right: 1px solid ${theme.colors.grey20};

  box-sizing: border-box;

  background-color: white;

  transition: all 0.3s ease-out;

  &:hover {
    width: 16.625rem;

    z-index: 9999;

    ${SideText} {
      visibility: visible;
      opacity: 1;
      transition: opacity 1s ease-out;
    }

    ${IconWrapper} {
      width: 13.625rem;
      transition: width 0.3s ease-out;
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;
