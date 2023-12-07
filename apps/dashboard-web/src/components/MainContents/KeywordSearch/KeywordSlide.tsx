'use client';

import { useMemo } from 'react';

import SvgComp from '@/components/common/SvgComp';
import { useRemoveKeywordMutation } from '@/hooks/react-query/mutation/useKeywordMutation';
import {
  useDeleteSearchwordMutation,
  useRemoveSearchwordMutation,
} from '@/hooks/react-query/mutation/useSearchwordMutation';
import useGetUserInfo from '@/hooks/react-query/query/useGetUserInfo';
import useClickScrollX from '@/hooks/useClickScrollX';
import useKeyword from '@/hooks/user/useKeyword';
import { useIsSignedIn } from '@/store/authStore';
import { convertKeywordsToArray, getHashKeyword } from '@/utils/keyword';

import KeywordItem from './KeywordItem';
import * as Style from './style';

// 현재 Button 클릭시 자동 X축 Scroll or 마우스 Wheel을 이용한 X축 Scroll 고민 중
// Wheel은 transform이려나

const KeywordSlide = () => {
  const { hashKeywordList, isGuest } = useKeyword();

  const isSignedIn = useIsSignedIn();

  const { data: userData } = useGetUserInfo();

  const searchWordList = useMemo(
    () => getHashKeyword(convertKeywordsToArray(userData?.searchWord)),
    [userData],
  );

  const keywordList = useMemo(
    () => getHashKeyword(convertKeywordsToArray(userData?.personalizationTag)),
    [userData],
  );

  const {
    containerRef,
    handleTapScrollX,
    handleRightScroll,
    handleLeftScroll,
  } = useClickScrollX();

  const { mutate: removeKeywordMutate } = useRemoveKeywordMutation();

  const { mutate: removeSearchwordMutate } = useRemoveSearchwordMutation();

  const { mutate: deleteSearchwordMutate } = useDeleteSearchwordMutation();

  return (
    <Style.KeywordTapContiner>
      <Style.ArrowLeftButton onClick={handleLeftScroll}>
        <SvgComp icon="KeywordLeftArrow" size="1.5rem" />
      </Style.ArrowLeftButton>
      <Style.ButtonContainer ref={containerRef}>
        {isSignedIn && (
          <>
            {keywordList.map((keyword) => (
              <KeywordItem
                key={keyword}
                $active={true}
                label={keyword}
                isSearchWord={false}
                keyValue={keyword}
                handleScrollX={handleTapScrollX}
                setRemoveKeyword={removeKeywordMutate}
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
                setRemoveKeyword={removeSearchwordMutate}
                setDeleteSearchword={deleteSearchwordMutate}
              />
            ))}
          </>
        )}

        {/**
         * 해당 isGuest -> keywordList 및 searchWordList로 변경한 이유는 isGuest가 silent refresh에서 verify되었냐 안되었냐(isLogedIn 전역상태)에 따라 달라지는데, 간혹 verifyToken동시성 문제로 인한 interceptor error 핸들링 코드 실패로 userData를 못 가져올 때가 존재함 (Login된 상태임에도 불구하고)
         * 위에 같은 상황일 때  keywordList 및 searchWordList도 가져오는데 실패했지만 isGuest도 false여서 빈 컴포넌트로 출력될 때가 존재했음.
         */}
        {((keywordList.length === 0 && searchWordList.length === 0) ||
          !isSignedIn) &&
          hashKeywordList.map((keyword) => (
            <KeywordItem
              key={keyword}
              $active={true}
              label={keyword}
              isSearchWord={false}
              keyValue={keyword}
              handleScrollX={handleTapScrollX}
              setRemoveKeyword={removeKeywordMutate}
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
