'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useClickScrollX from '@/hooks/useClickScrollX';
import useKeyword from '@/hooks/user/useKeyword';
import { apiClient } from '@/utils/api/apiClient';
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

  const { data: userData } = useGetUserInfo();

  const searchWordList = useMemo(
    () => getHashKeyword(convertKeywordsToArray(userData?.searchWord)),
    [userData],
  );

  // const searchWordList = getHashKeyword(
  //   convertKeywordsToArray(userData?.searchWord),
  // );
  // 이게 왜 이상하게 쌓이지?

  const {
    containerRef,
    handleTapScrollX,
    handleRightScroll,
    handleLeftScroll,
  } = useClickScrollX();

  const queryClient = useQueryClient();

  const { mutate } = apiClient(1).user.putUpdatePersonalTag.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(['keyword']);
      queryClient.invalidateQueries(['user']);
    },
  });

  const { mutate: mutateSearchWord } = apiClient(
    1,
  ).user.putSearchWord.useMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries(['user']);
    },
  });

  const handleRemoveKeyword = (item: string) => {
    mutate({
      body: {
        tag: removeHashAndConvertToArray(userData?.personalizationTag, item),
      },
    });
  };

  const handleRemoveSearchWord = (item: string) => {
    mutateSearchWord({
      body: {
        searchWord: removeHashAndConvertToArray(userData?.searchWord, item),
      },
    });
  };

  const handleDeleteSearchWord = (item: string) => {
    mutateSearchWord({
      body: {
        searchWord: deleteKeywordAndConvertToArray(userData?.searchWord, item),
      },
    });
  };

  const removeHashAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }
      // 문자열을 콤마(,)로 분리하여 배열로 만듭니다.
      const dataArray = userKeyword.split(',');

      // 배열 요소 중에서 keyword와 일치하는 부분을 찾아서 '#'을 제거합니다.
      for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].includes(keyword)) {
          dataArray[i] = dataArray[i].replace('#', '');
        }
      }

      return dataArray;
    },
    [],
  );

  const deleteKeywordAndConvertToArray = useCallback(
    (userKeyword: string | undefined | null, keyword: string) => {
      if (userKeyword === null || userKeyword === undefined) {
        throw new Error('데이터를 저장하는데 문제가 생겼습니다.');
      }

      const dataArray = userKeyword.split(',');

      // 키워드와 일치하며, #이 붙어있지 않은 요소만 남김
      const resultArray = dataArray.filter((item) => {
        const regex = new RegExp(`^${keyword}(#)?$`);
        return !regex.test(item);
      });

      return resultArray;
    },
    [],
  );

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
            isSearchWord={false}
            keyValue={keyword}
            handleScrollX={handleTapScrollX}
            setRemoveKeyword={handleRemoveKeyword}
          />
        ))}
        {searchWordList.map((keyword) => (
          <KeywordItem
            key={keyword}
            $active={true}
            isSearchWord={true}
            label={keyword}
            keyValue={keyword}
            handleScrollX={handleTapScrollX}
            setRemoveKeyword={handleRemoveSearchWord}
            setDeleteSearchword={handleDeleteSearchWord}
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
