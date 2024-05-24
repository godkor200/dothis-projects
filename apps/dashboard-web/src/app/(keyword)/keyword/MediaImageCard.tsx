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

const MediaImageCard = () => {
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

  const mock = [
    {
      title: '탕후루집 오픈',
      provider: '탕후루',
      element: '창업',
      uploadDate: dayjs(`${'2024-04-05'}`).format('YYYY.MM.DD'),
      image: externaImageLoader(getMainImage('213232')),
      link: '없음',
      hilight: '테스트 ',
    },
    {
      title: '탕후루집 오픈',
      provider: '탕후루',
      element: '창업',
      uploadDate: dayjs(`${'2024-04-05'}`).format('YYYY.MM.DD'),
      image: externaImageLoader(getMainImage('213232')),
      link: '없음',
      hilight: '테스트 ',
    },
    {
      title: '탕후루집 오픈',
      provider: '탕후루',
      element: '창업',
      uploadDate: dayjs(`${'2024-04-05'}`).format('YYYY.MM.DD'),
      image: externaImageLoader(getMainImage('213232')),
      link: '없음',
      hilight: '테스트 ',
    },
  ];
  return (
    <>
      {mock?.map(
        ({ element, image, link, provider, title, uploadDate }, index) => (
          <div
            className="rounded-10 border-grey300 max-w-[480px] flex-1 cursor-pointer overflow-hidden border border-solid"
            key={title + index}
          >
            <Link href={`${link}` as Route} target="_blank">
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
                <h3 className="text-grey700 mb-5 line-clamp-2 min-h-[42px] text-[16px] font-bold">
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
    </>
  );
};

export default MediaImageCard;
