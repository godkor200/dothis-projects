'use client';

import { useEffect, useState } from 'react';

import type { MedialTabNavDataCategoryType } from '@/constants/TabNav';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useGptOptionAction } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';

import News from './News';

interface Props {
  selectedArticle: MedialTabNavDataCategoryType;
}

const SocialFeedContainer = ({ selectedArticle }: Props) => {
  const seletedWord = useSelectedWord();

  /**
   * 기존에는 Tab을 클릭하면 해당 컴포넌트가 mount되어서 data도 mount에 동시에 fetch되어서 가져오는 형식이였지만, openAI 섹션이 추가되면서 Tab클릭이 아닌 Background에서도 해당 데이터가 필요한 경우가 발생.
   * 그로인해서 부모컴포넌트인 여기서 data fetch와 동시에 gptOption setter 함수 실행
   */
  const { setRelatedNews } = useGptOptionAction();

  const { data: newsData, isLoading: newsIsLoading } =
    useGetNewsInfiniteQuery();

  /**
   * setter를 초기화와 동시에 상위 3가지 컬럼을 가져와서 저장한다.
   */
  useEffect(() => {
    if (!newsIsLoading) {
      const relatedNewsData = newsData?.pages[0].return_object.documents
        .filter((item, index) => index < 3)
        .map((item) => item.title);

      setRelatedNews((prev) => [...relatedNewsData!]);
    }
  }, [newsIsLoading]);

  return (
    <>
      {selectedArticle === 'news' ? (
        <>
          <News />
        </>
      ) : (
        <div className="mt-10 flex flex-wrap gap-[1.25rem]">
          <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
            서비스 준비중 입니다.
          </p>
        </div>
      )}
    </>
  );
};

export default SocialFeedContainer;
