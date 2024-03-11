'use client';

import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import { useGptOptionAction } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externalYouTubeImageLoader } from '@/utils/imagesUtil';

import type { MediaDigestData } from '.';
import MediaDigestList from './MediaDigestList';

const YouTube = () => {
  const selectedWord = useSelectedWord();

  const {
    data: youtubeVideoData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetVideoDataInfinityQuery(selectedWord);

  const handleFetchNextPage = useCallback(
    (isInview: boolean) => {
      if (isInview && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const { setRelatedVideo } = useGptOptionAction();

  /**
   * openAI 섹션에서 필요한 데이터 setter 섹션
   */
  useEffect(() => {
    if (!isLoading) {
      const relatedVideoData = youtubeVideoData
        ?.filter((item, index) => index < 3)
        .map((item) => item.videoTitle);
      if (relatedVideoData) {
        setRelatedVideo((prev) => [...relatedVideoData!]);
      }
    }
  }, [isLoading]);

  /**
   * @mediaDigestData api로 받아온 youtubeVideoData의 필요한 프로퍼티만 가져와서 포맷팅을 수정하는 코드
   * News 컴포넌트와 동일한 컴포넌트를(MediaDigest) 사용하기때문에 추가된 섹션
   */
  const mediaDigestData: MediaDigestData[] | undefined = youtubeVideoData?.map(
    (item) => {
      const compactNumber = new Intl.NumberFormat('ko', {
        notation: 'compact',
      });
      return {
        title: item.videoTitle,
        provider: item.videoTitle,
        element: `조회수 ${compactNumber.format(item.videoCluster)}`,
        uploadDate: dayjs(item.videoPublished).format('YYYY-MM-DD'),
        image: externalYouTubeImageLoader(item.videoId),
        link: item.channelId,
      };
    },
  );

  /**
   * 이하 jsx전까지의 코드들은 선택된 video의 대한 추가적인 분석정보를 가져와서 Block을 구성했을 디자인 때 존재했던 코드입니다.
   * 현재는 사용 X
   */
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSetSelectedMedia = (index: number) => {
    setSelectedIndex(index);
  };

  // 현재 데이터 페이지 인덱스가 clusternumber인데,  한페이지만 보여주고 있어서 임의로 하나만 지정했습니다. 하지만 해당 clusternumber에 에러가 있을 시 계속 skeleton UI 만 나오는 현상이 있을 수 있어서 에러바운더리를 설정해주는게 좋습니다
  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <MediaDigestList.skeleton />
      </div>
    );
  }

  if (mediaDigestData === undefined || mediaDigestData?.length === 0) {
    return (
      <div className="mt-10 flex flex-wrap gap-[1.25rem]">
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          해당 키워드에 대한 동영상이 없습니다
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-10 flex gap-[1.25rem]">
        <div className="flex-1">
          <MediaDigestList
            mediaDigestData={mediaDigestData}
            handleSetSelectedMedia={handleSetSelectedMedia}
            handleFetchNextPage={handleFetchNextPage}
          />
        </div>
      </div>
    </>
  );
};

export default YouTube;
