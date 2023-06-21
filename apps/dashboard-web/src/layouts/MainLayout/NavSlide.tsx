'use client';

import { theme } from '@dothis/theme/dashboard/index';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import SvgComp from '@/components/share/SvgComp';
import useClickScrollX from '@/hooks/useClickScrollX';

import NavSlideContent from './NavSlideContent';

export enum KeywordCategory {
  Review = '리뷰',
  Community = '커뮤니티',
  house = '부동산',
  zod = '조드',
  story = '스토리북',
  trpc = '티알피시',
  food = '맛집',
  trip = '여행',
  vlog = '브이로그',
  diet = '다이어트',
  ASMR = 'ASMR',
}

const KEYWORD_CATEGORIES: Record<KeywordCategory, string> = {
  [KeywordCategory.Review]: ' 리뷰',
  [KeywordCategory.Community]: '커뮤니티sadasdsa',
  [KeywordCategory.house]: '부동산 테스트다 스크롤',
  [KeywordCategory.zod]: '부동산 테스트다 스크롤',
  [KeywordCategory.story]: '스토리북',
  [KeywordCategory.trpc]: '티알피시',
  [KeywordCategory.food]: '맛집탐방 냠냠',
  [KeywordCategory.trip]: '제주도 가고싶다',
  [KeywordCategory.vlog]: '이 스펠링이 맞나',
  [KeywordCategory.diet]: '다이어트 해야함',
  [KeywordCategory.ASMR]: 'ASMR',
} as const;

// 일단은 array 로 만들었지만,, 추후 List들어오는 api 형식보고서 최종결정 예정입니다!
// 반응형도 고려해서 생성하였지만, 모바일 단계에서는 다른 형식으로 전환하긴 해야함
// 이것도 SVG 색채우기는  다른 MainLayout과 함께 작업예정
// 추후 리팩토링을 통해 코드 분할 예정
// 현재 Button 클릭시 자동 X축 Scroll or 마우스 Wheel을 이용한 X축 Scroll 고민 중
// Wheel은 transform이려나

function NavSlide() {
  const [keywordCategory, setKeywordCategory] = useState<KeywordCategory[]>([]);

  const [handleScrollX, containerRef] = useClickScrollX();

  return (
    <KeywordTapContiner>
      <ResetButton>
        <SvgComp icon="NavSlideReset" size="1.5rem" />
      </ResetButton>
      <ButtonContainer ref={containerRef}>
        {Object.entries(KEYWORD_CATEGORIES).map(([key, label]) => (
          <NavSlideContent
            key={key}
            $active={keywordCategory.includes(key as KeywordCategory)}
            label={label}
            keyValue={key}
            handleScrollX={handleScrollX}
            setKeywordCategory={setKeywordCategory}
          />
        ))}
      </ButtonContainer>
      <ArrowButton />
    </KeywordTapContiner>
  );
}

export default NavSlide;

const KeywordTapContiner = styled.nav`
  display: flex;
  flex-wrap: nowrap;
  gap: 1.5rem;

  margin-bottom: 1.5rem;
  padding: 1.875rem 3rem;

  position: sticky;
  top: 0rem;

  background-color: white;

  transition: all 0.5s ease;
  white-space: nowrap;
`;

const ResetButton = styled.button`
  padding: 0.5rem 1.25rem;
  border: 1px solid ${theme.colors.grey40};
  border-radius: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;

  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ArrowButton = styled.button`
  position: relative;

  /* 오른쪽 정렬이 필요 (Keyword List가 적을 때) */
  margin: 0 0 0 auto;
  padding: 0.5rem 1.25rem;
  border: 1px solid ${theme.colors.grey40};
  border-radius: 0.5rem;

  &::before {
    content: '';
    display: inline-block;

    position: absolute;
    top: 0;
    bottom: 0;
    /* ArrowButton에 좌우 패팅만큼  */
    right: 2.625rem;

    width: 10rem;

    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0.2) 10%,
      rgba(255, 255, 255, 0.4) 20%,
      rgba(255, 255, 255, 0.6) 40%,
      rgba(255, 255, 255, 0.7) 50%,
      rgba(255, 255, 255, 0.9) 60%,
      white 70%
    );

    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 50%;

    border: solid black;
    border-width: 0 2px 2px 0;
    padding: 0.25rem;

    transform: translate(20%, -50%) rotate(-45deg);
  }
`;
