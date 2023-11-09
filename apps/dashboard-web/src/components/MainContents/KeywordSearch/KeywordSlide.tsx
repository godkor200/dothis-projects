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
import { convertKeywordsToArray, getHashKeyword } from '@/utils/keyword';

import KeywordItem from './KeywordItem';
import * as Style from './style';

// 현재 Button 클릭시 자동 X축 Scroll or 마우스 Wheel을 이용한 X축 Scroll 고민 중
// Wheel은 transform이려나

const KeywordSlide = () => {
  const { hashKeywordList } = useKeyword();

  const { data: userData } = useGetUserInfo();

  const searchWordList = useMemo(
    () => getHashKeyword(convertKeywordsToArray(userData?.searchWord)),
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
        {hashKeywordList.map((keyword) => (
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
      </Style.ButtonContainer>
      <Style.ArrowRightButton onClick={handleRightScroll}>
        <SvgComp icon="KeywordRightArrow" size="1.5rem" />
      </Style.ArrowRightButton>
    </Style.KeywordTapContiner>
  );
};

export default KeywordSlide;
