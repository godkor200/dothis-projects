'use client';

import { useEffect, useState } from 'react';

import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import { useGptOptionAction } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';

import YouTube from './Youtube';

const YoutubeArticlesContainer = () => {
  const seletedWord = useSelectedWord();

  /**
   * 기존에는 Tab을 클릭하면 해당 컴포넌트가 mount되어서 data도 mount에 동시에 fetch되어서 가져오는 형식이였지만, openAI 섹션이 추가되면서 Tab클릭이 아닌 Background에서도 해당 데이터가 필요한 경우가 발생.
   * 그로인해서 부모컴포넌트인 여기서 data fetch와 동시에 gptOption setter 함수 실행
   */
  const { setRelatedVideo } = useGptOptionAction();

  /**
   * setter를 초기화와 동시에 상위 3가지 컬럼을 가져와서 저장한다.
   */

  const { data: videoData, isLoading: videoIsLoading } =
    useGetVideoDataInfinityQuery(seletedWord);

  /**
   * setter를 초기화와 동시에 상위 3가지 컬럼을 가져와서 저장한다.
   */
  useEffect(() => {
    if (!videoIsLoading) {
      const relatedVideoData = videoData
        ?.filter((item, index) => index < 3)
        .map((item) => item._source.video_title);
      if (relatedVideoData) {
        setRelatedVideo((prev) => [...relatedVideoData!]);
      }
    }
  }, [videoIsLoading]);

  return (
    <>
      <YouTube />
    </>
  );
};

export default YoutubeArticlesContainer;
