'use client';

import { theme } from '@dothis/theme/dashboard/index';
import { css, styled } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';

// Header 반응형 디자인이나 기획이 나오면 반응형 대응 예정
function GNB() {
  return (
    <Container>
      <SearchInputWrapper>
        <SearchInput placeholder="키워드를 넣어주세요" />
        <SearchIconWrapper>
          <SvgComp icon="HeaderPlus" size="2rem" />
        </SearchIconWrapper>
      </SearchInputWrapper>
      <UnknownIconWrapper>
        <SvgComp icon="HeaderEdit" size="1.5rem" />
      </UnknownIconWrapper>

      {/* 이 부분은 Hover 디자인과 클릭 시 기능을 파악하고 추가 작업 */}
      <UserGNBWrapper>
        <UserGNBIconWrapper>
          <SvgComp icon="HeaderTicket" size="1.5rem" />
        </UserGNBIconWrapper>
        <UserGNBIconWrapper>
          <SvgComp icon="HeaderNotification" size="1.5rem" />
        </UserGNBIconWrapper>
        <UserGNBIconWrapper>
          <SvgComp icon="HeaderUserProfile" size="1.5rem" />
        </UserGNBIconWrapper>
      </UserGNBWrapper>
    </Container>
  );
}
export default GNB;

const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: 100%;
  height: 5.5rem;

  padding: 1.25rem;

  border-bottom: 1px solid ${theme.colors.grey10};

  box-sizing: border-box;
`;

const SearchInputWrapper = styled.div`
  position: relative;

  flex-grow: 1;
  max-width: 27.5rem;
`;

const SearchInput = styled.input`
  width: 100%;

  border: 2px solid;
  border-radius: 0.5rem;
  border-color: ${theme.colors.grey10};
  padding: 0.75rem 3.5rem 0.75rem 1rem;
  box-sizing: border-box;

  background-color: ${theme.colors.grey00};

  font-size: 1rem;

  outline: none;

  transition: all 0.5s;

  /* &::-webkit-search-cancel-button {
    display: none;
  } */

  &:focus {
    border-color: ${theme.colors.primary30};
  }

  &::placeholder {
    font-size: 1rem;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  right: 1rem;
  top: 50%;

  transform: translate(0, -50%);
`;

const UnknownIconWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: 0.75rem;
  padding: 0.75rem;
  border: 1px solid ${theme.colors.primary20};
  border-radius: 0.5rem;

  background-color: ${theme.colors.primary20};
`;

const UserGNBWrapper = styled.div`
  display: flex;
  gap: 0.75rem;

  position: absolute;
  right: 3rem;

  @media screen and (max-width: 1200px) {
    gap: 0.25rem;
  }
`;

const UserGNBIconWrapper = styled.div`
  padding: 0.75rem;

  border-radius: 0.5rem;

  &:hover {
    background-color: ${theme.colors.grey10};
  }
`;
