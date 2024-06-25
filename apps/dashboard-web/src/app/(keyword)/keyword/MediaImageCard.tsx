'use client';

import dayjs from 'dayjs';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ApiErrorComponent from '@/components/common/Charts/ApiErrorComponent ';
import SvgComp from '@/components/common/SvgComp';
import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import MediaDigestSummary from '@/components/MainContents/MediaArticles/MediaDigestSummary';
import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { cn } from '@/utils/cn';
import {
  externaImageLoader,
  externalYouTubeImageLoader,
  getMainImage,
} from '@/utils/imagesUtil';
import { handleImageError } from '@/utils/imagesUtil';

import BoxLoadingComponent from './BoxLoadingComponent';

const MediaImageCard = ({ keyword }: { keyword: string }) => {
  const selectedWord = useSelectedWord();

  const {
    data: youtubeVideoData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useGetVideoDataInfinityQuery({ keyword: keyword, relword: keyword });

  /**
   * @mediaDigestData api로 받아온 youtubeVideoData의 필요한 프로퍼티만 가져와서 포맷팅을 수정하는 코드
   * News 컴포넌트와 동일한 컴포넌트를(MediaDigest) 사용하기때문에 추가된 섹션
   */
  const mediaDigestData: MediaDigestData[] | undefined = youtubeVideoData
    ?.filter((item) => item.videoViews)
    ?.map((item) => {
      const compactNumber = new Intl.NumberFormat('ko', {
        notation: 'compact',
      });

      return {
        title: item.videoTitle,
        provider: item.channelName,
        element: `조회수 ${compactNumber.format(item.videoViews)}`,
        uploadDate: dayjs(`${item.year}-${item.month}-${item.day}`).format(
          'YYYY-MM-DD',
        ),
        image: externalYouTubeImageLoader(item.videoId),
        link: item.videoId,
      };
    });

  if (isLoading) {
    return (
      <div>
        <BoxLoadingComponent
          classname={cn('absolute top-0 right-3 w-[80px] h-[80px]')}
        />
        <div className="flex justify-between gap-[24px] ">
          {Array.from({ length: 3 }).map((item, i) => (
            <div
              className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid"
              key={i}
            >
              <div className="relative flex aspect-video items-center justify-center overflow-hidden">
                <SvgComp
                  icon="SideLogo"
                  width={60}
                  height={60}
                  className="opacity-30"
                />
              </div>
              <div className="h-[50px]"></div>
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
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[350px] items-center">
        <ApiErrorComponent refetch={refetch} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between gap-[24px] ">
        {mediaDigestData
          ?.slice(0, 3)
          ?.map(
            ({ element, image, link, provider, title, uploadDate }, index) => (
              <div
                className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid"
                key={title + index}
              >
                <Link
                  href={`https://www.youtube.com/watch?v=${link}` as Route}
                  target="_blank"
                >
                  <div className="relative aspect-video overflow-hidden bg-black">
                    <Image
                      unoptimized
                      src={image}
                      alt="Picture of the author"
                      onError={handleImageError}
                      fill={true}
                      // layout="responsive"

                      className="object-cover"
                    />
                  </div>

                  <div className="px-[16px] py-[12px]">
                    <h3 className="text-grey700 mb-5 line-clamp-1    text-[16px] font-bold">
                      {title}
                    </h3>
                    <MediaDigestSummary
                      provider={provider}
                      element={element}
                      uploadDate={uploadDate}
                    />
                  </div>
                </Link>
              </div>
            ),
          )}
      </div>
    </div>
  );
};

export default MediaImageCard;
