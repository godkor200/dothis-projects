'use client';

import dayjs from 'dayjs';
import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import MediaDigestSummary from '@/components/MainContents/MediaArticles/MediaDigestSummary';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';
import { handleImageError } from '@/utils/imagesUtil';

const MediaTextCard = ({ keyword }: { keyword: string }) => {
  const selectedWord = useSelectedWord();
  const { data: newsData, isLoading } = useGetNewsInfiniteQuery({ keyword });

  const flattenNewsData = newsData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  const filterImageNewsData = flattenNewsData?.filter(
    (item) => !item.images.endsWith('undefined'),
  );

  const uniqueDocuments = Array.from(
    new Set(filterImageNewsData?.map((item) => item.title)),
  ).map((item) => filterImageNewsData?.find((doc) => doc.title === item));

  const mediaDigestData: MediaDigestData[] | undefined = uniqueDocuments
    ?.map((item) => {
      return {
        title: item?.title!,
        provider: item?.provider!,
        element: item?.category[0]!,
        uploadDate: dayjs(`${item?.dateline}`).format('YYYY.MM.DD')!,
        image: externaImageLoader(getMainImage(item?.images!))!,
        link: item?.provider_link_page!,
        hilight: item?.hilight!,
      };
    })
    .slice(0, 3);

  const emptyMediaLength = useMemo(
    () => 3 - mediaDigestData.length,
    [JSON.stringify(mediaDigestData)],
  );

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
      {mediaDigestData.map((media) => (
        <Link href={media.link as Route} target="_blank">
          <div
            className="rounded-10 bg-grey200 flex w-[480px] flex-col  justify-between px-[30px] py-[17px]"
            key={media.title}
          >
            <p>{media.title}</p>
            <MediaDigestSummary
              element={media.element}
              provider={media.provider}
              uploadDate={media.uploadDate}
            />
          </div>
        </Link>
      ))}

      {Array.from({ length: emptyMediaLength }).map((_, i) => (
        <div className="w-[480px] bg-inherit" key={i}></div>
      ))}
    </>
  );
};

export default MediaTextCard;
