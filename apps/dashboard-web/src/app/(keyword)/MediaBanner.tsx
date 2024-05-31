'use client';
import dayjs from 'dayjs';

import type { MediaDigestData } from '@/components/MainContents/MediaArticles';
import SelectedMediaCard from '@/components/MainContents/MediaArticles/SelectedMediaCard';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { cn } from '@/utils/cn';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

const MediaBanner = () => {
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

  if (isLoading) {
    return (
      <div className="mx-auto my-[80px]  flex w-[1342px] justify-between gap-[120px] px-[48px]">
        {/* <CurrentArticle.skeleton /> */}
        <SelectedMediaCard.skeleton />
        <SelectedMediaCard.skeleton />
        <SelectedMediaCard.skeleton />
      </div>
    );
  }

  if (mediaDigestData?.length === 0 || !mediaDigestData) {
    return null;
  }

  return (
    <div className="flex justify-between gap-[20px] ">
      {mediaDigestData.map(
        ({ title, element, provider, uploadDate, image, link }, index) => (
          <SelectedMediaCard
            key={title + index}
            title={title}
            provider={provider}
            element={element}
            uploadDate={uploadDate}
            image={image}
            link={link}
          />
        ),
      )}
    </div>
  );
};

export default MediaBanner;
