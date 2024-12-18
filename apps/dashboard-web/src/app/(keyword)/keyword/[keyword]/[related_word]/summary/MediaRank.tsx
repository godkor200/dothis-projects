'use client';

import dayjs from 'dayjs';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import ApiErrorComponent from '@/components/common/Charts/ApiErrorComponent ';
import APIErrorBoundary from '@/components/common/Error/APIErrorBoundary';
import APILoadingBoundary from '@/components/common/Error/APILoadingBoundary';
import SvgComp from '@/components/common/SvgComp';
import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import MediaDigestSummary from '@/components/MainContents/MediaArticles/MediaDigestSummary';
import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import { cn } from '@/utils/cn';
import {
  externalYouTubeImageLoader,
  handleImageError,
} from '@/utils/imagesUtil';

import BoxLoadingComponent from '../../../BoxLoadingComponent';

interface Props {
  baseKeyword: string;
  relatedKeyword: string;
}

const MediaRank = ({ baseKeyword, relatedKeyword }: Props) => {
  const {
    data: youtubeVideoData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
    isError,
    refetch,
    isFetching,
  } = useGetVideoDataInfinityQuery({
    keyword: baseKeyword,
    relword: relatedKeyword,
  });

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
        uploadDate: dayjs(item.videoPublished).format('YYYY-MM-DD'),
        image: externalYouTubeImageLoader(item.videoId),
        link: item.videoId,
      };
    });

  const rankColorList = [
    ['#FFBF00', '#FFDC73'],
    ['#A1A1AA', '#D4D4D8'],
    ['#BB9A6B', '#CCAC7C'],
  ];

  return (
    <APIErrorBoundary
      hasError={isError}
      refetchCallback={refetch}
      classname="flex min-h-[350px] items-center"
      statusCode={error?.status}
      baseKeyword={baseKeyword}
      relatedKeyword={relatedKeyword}
    >
      <APILoadingBoundary isLoading={isLoading} loadingComponent={<Skeleton />}>
        <div className="flex  gap-[24px] ">
          {mediaDigestData
            ?.slice(0, 5)
            ?.map(
              (
                { element, image, link, provider, title, uploadDate },
                index,
              ) => {
                // const [bgColor, borderColor] = rankColorList[index] ?? [
                //   '#F7B4C0',
                //   '#FDE7EB',
                // ];

                const [bgColor, borderColor] = rankColorList[index] || [
                  '#F7B4C0',
                  '#FDE7EB',
                ];

                const css1 = `border-[${borderColor}]`;

                const css2 = `bg-[${bgColor}]`;

                return (
                  <div
                    className="rounded-10 border-grey300 relative max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid shadow"
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

                    <div
                      className={cn(
                        `w-[40px] h-[40px] absolute top-1 left-1 rounded-full border-[5px] text-center text-white font-bold text-[14px] flex items-center justify-center opacity-[95]`,
                        {
                          'w-[30px] h-[30px] top-2 left-2': index > 2,
                        },
                      )}
                      style={{
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                      }}
                    >
                      {index + 1}
                    </div>
                  </div>
                );
              },
            )}
        </div>
      </APILoadingBoundary>
    </APIErrorBoundary>
  );
};

export default MediaRank;

const Skeleton = () => {
  return (
    <div className="flex flex-1 justify-between gap-[24px]  ">
      {Array.from({ length: 5 }).map((item, i) => (
        <div
          className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid shadow"
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
  );
};
