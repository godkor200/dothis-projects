'use client';

import { useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import useClickScrollX from '@/hooks/useClickScrollX';
import useKeyword from '@/hooks/user/useKeyword';
import { convertKeywordsToArray, getHashKeyword } from '@/utils/keyword';

import KeywordItem from './KeywordItem';
import * as Style from './style';

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

interface Props {
  keyword: string | undefined | null;
}

const KeywordSlide = ({ keyword }: Props) => {
  // prefetch해서 가져온 keyword data를 초기에 넣어주기.
  // data 형식이 아직 어떤식으로 넘어오는지 확인은 하지못하여 임시로 string[] 로 선언

  // 아마 keyword를 추가하는 것도 하나의 mutate로 들어갈 것 같습니다.  (당장 Context로 상태를 만들어 searchBar와 연결해서 추가 삭제를 구현하고 싶었지만, 해당 상태는 서버 데이터로 관리되지 않을까??라는 생각에 미뤄두었습니다. )

  const [keywordList, setKeywordList] = useState<string[]>([
    '먹방',
    '요리',
    '와인',
    '맛집',
    '커피',
    '카페',
    '브이로그',
  ]);

  const { hashKeywordList } = useKeyword();
  // 제거하는 api 요청하기. (해당 hook에 제거 mutate있으면 좋음)

  const [targetKeywords, setTargetKeywords] = useState<string[]>([]);
  // targetKeywords,keywordsToAnalyze 등등 변수명 고민-
  // 선택된 키워드를 담는 배열입니다.

  const {
    containerRef,
    handleTapScrollX,
    handleRightScroll,
    handleLeftScroll,
  } = useClickScrollX();

  return (
    <Style.KeywordTapContiner>
      <Style.ArrowLeftButton onClick={handleLeftScroll}>
        <SvgComp icon="KeywordLeftArrow" size="1.5rem" />
      </Style.ArrowLeftButton>
      <Style.ButtonContainer ref={containerRef}>
        {hashKeywordList.map((keyword) => (
          <KeywordItem
            key={keyword}
            $active={true}
            label={keyword}
            keyValue={keyword}
            handleScrollX={handleTapScrollX}
            setKeywordList={setKeywordList}
            setTargetKeywords={setTargetKeywords}
          />
        ))}
      </Style.ButtonContainer>
      <Style.ArrowRightButton onClick={handleRightScroll}>
        <SvgComp icon="KeywordRightArrow" size="1.5rem" />
      </Style.ArrowRightButton>
    </Style.KeywordTapContiner>
  );
};

export default KeywordSlide;
