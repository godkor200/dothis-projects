'use client';

import dayjs from 'dayjs';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import MediaDigestSummary from '@/components/MainContents/MediaArticles/MediaDigestSummary';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';
import { handleImageError } from '@/utils/imagesUtil';

const MediaTextCard = ({ keyword }: { keyword: string }) => {
  const selectedWord = useSelectedWord();
  const { data: newsData, isLoading } = useGetNewsInfiniteQuery();

  const flattenNewsData = newsData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  const mediaDigestData: MediaDigestData[] | undefined = flattenNewsData
    ?.map((item) => {
      return {
        title: item.title,
        provider: item.provider,
        element: item.category[0],
        uploadDate: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
        image: externaImageLoader(getMainImage(item.images)),
        link: item.provider_link_page,
        hilight: item.hilight,
      };
    })
    .slice(0, 3);

  if (isLoading || !mediaDigestData) {
    return (
      <>
        {Array.from({ length: 3 }).map((item, i) => (
          <div
            key={i}
            className="rounded-10 bg-grey200 h-[100px] w-[480px] px-[30px] py-[17px]"
          ></div>
        ))}
      </>
    );
  }

  return (
    <>
      <div className="rounded-10 bg-grey200 flex w-[480px] flex-col  justify-between px-[30px] py-[17px]">
        <p>{mediaDigestData[0].title}</p>
        <MediaDigestSummary
          element={mediaDigestData[0].element}
          provider={mediaDigestData[0].provider}
          uploadDate={mediaDigestData[0].uploadDate}
        />
      </div>

      <div className="rounded-10 bg-grey200 flex w-[480px] flex-col  justify-between px-[30px] py-[17px]">
        <p>{mediaDigestData[1].title}</p>
        <MediaDigestSummary
          element={mediaDigestData[1].element}
          provider={mediaDigestData[1].provider}
          uploadDate={mediaDigestData[1].uploadDate}
        />
      </div>
      <div className="rounded-10 bg-grey200 flex w-[480px] flex-col  justify-between px-[30px] py-[17px]">
        <p>{mediaDigestData[2].title}</p>
        <MediaDigestSummary
          element={mediaDigestData[2].element}
          provider={mediaDigestData[2].provider}
          uploadDate={mediaDigestData[2].uploadDate}
        />
      </div>
    </>
  );
};

export default MediaTextCard;
