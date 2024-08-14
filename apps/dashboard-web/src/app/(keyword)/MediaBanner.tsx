'use client';

import { useMemo, useRef, useState } from 'react';

import SvgComp from '@/components/common/SvgComp';
import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetWeeklyTrendKeyword from '@/hooks/react-query/query/useGetWeeklyTrendKeyword';
import type { MediaProps } from '@/utils/media/mediaFormat';

import MediaFetchTimeHanlde from './MediaFetchTimeHandle';

type MediaCategory = 'youtube' | 'news';

export type MediaList = {
  baseKeyword: string;
  mediaData: MediaProps;
  mediaType: MediaCategory;
  fetchTime: number;
};

const MediaBanner = () => {
  const mediaCount = 3;

  const randomMediaTypeRef = useRef(
    Array.from({ length: 3 }, () => (Math.random() < 0.5 ? 'news' : 'youtube')),
  );

  const randomMediaTypeList = randomMediaTypeRef.current;

  const [mediaErrorCount, setMediaErrorCount] = useState(0);

  const [fechTimeMediaList, setFetchTimeMediaList] = useState<MediaList[]>([]);

  const { data: weeklyKeywordsData } = useGetWeeklyTrendKeyword();

  const weeklyKeywordList = useMemo(
    () =>
      weeklyKeywordsData?.flatMap(
        ({ recommendedKeyword, topAssociatedWord }, index) => ({
          baseKeyword: recommendedKeyword,
          relatedKeyword: topAssociatedWord
            ? topAssociatedWord.split(',')[0] ?? ''
            : '',
          mediaType: (randomMediaTypeList[index] ?? 'youtube') as MediaCategory,
        }),
      ),
    [JSON.stringify(weeklyKeywordsData)],
  );

  const sortedFetchTimeMediaList = fechTimeMediaList
    .slice(0, 3)
    .sort((a, b) => {
      // 먼저 mediaCategory를 내림차순으로 정렬
      // if (a.mediaCategory > b.mediaCategory) return -1;
      // if (a.mediaCategory < b.mediaCategory) return 1;
      // mediaCategory가 같으면 fetchTime을 오름차순으로 정렬
      return a.fetchTime - b.fetchTime;
    });

  const emptyMediaLength = useMemo(
    () => 3 - sortedFetchTimeMediaList.length,
    [JSON.stringify(sortedFetchTimeMediaList)],
  );

  return (
    <>
      <div>
        {weeklyKeywordList?.map(
          ({ baseKeyword, relatedKeyword, mediaType }, index) => (
            <MediaFetchTimeHanlde
              baseKeyword={baseKeyword}
              relatedKeyword={relatedKeyword}
              mediaType={mediaType}
              currentIndex={index}
              mediaErrorCount={mediaErrorCount}
              visibleMediaCount={mediaCount}
              setFetchTimeMediaList={setFetchTimeMediaList}
              setMediaErrorCount={setMediaErrorCount}
              key={index}
            />
          ),
        )}
      </div>
      <div className="flex justify-between gap-[20px] ">
        {sortedFetchTimeMediaList?.map(
          ({ mediaData, mediaType, fetchTime }, index, array) =>
            mediaData && (
              <SelectedMediaCard
                key={mediaData.title + index}
                mediaType={mediaType}
                title={mediaData.title}
                provider={mediaData.provider}
                element={mediaData.element}
                uploadDate={mediaData.uploadDate}
                image={mediaData.image}
                link={mediaData.link}
              />
            ),
        )}

        {Array.from({ length: emptyMediaLength }).map((_, i) => (
          <SelectedMediaCard.skeleton key={i} />
        ))}
      </div>
    </>
  );
};

export default MediaBanner;

const Skeleton = () => {
  return (
    <div>
      <div className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid">
        <div className="relative flex aspect-video items-center justify-center overflow-hidden">
          <SvgComp
            icon="SideLogo"
            width={60}
            height={60}
            className="opacity-30"
          />
        </div>
        <div className="h-[100px]"></div>
      </div>
    </div>
    // <div
    //   className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid"
    //   key={i}
    // >
    //   <div
    //     className="bg-grey200 dark:bg-grey700 relative flex aspect-video animate-pulse  items-center justify-center overflow-hidden rounded-lg"
    //     role="status"
    //   >
    //     <svg
    //       className="text-grey400 dark:text-grey600 h-10 w-10"
    //       aria-hidden="true"
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="currentColor"
    //       viewBox="0 0 16 20"
    //     >
    //       <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
    //       <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
    //     </svg>
    //     <span className="sr-only">Loading...</span>
    //   </div>

    //   <div className="px-[16px] py-[12px]">
    //     <p className=" bg-grey200 mb-2 line-clamp-2 h-[16px] w-[278px] rounded-full "></p>
    //     <div className="flex gap-[8px]">
    //       <p className=" bg-grey200 h-[16px] w-[64px] rounded-full "></p>
    //       <p className=" bg-grey200  h-[16px] w-[32px] rounded-full "></p>
    //       <p className=" bg-grey200  h-[16px] w-[32px] rounded-full "></p>
    //     </div>
    //   </div>
    // </div>
  );
};
