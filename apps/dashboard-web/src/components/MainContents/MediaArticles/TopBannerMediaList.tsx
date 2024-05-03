import dayjs from 'dayjs';

import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { useSelectedWord } from '@/store/selectedWordStore';
import { cn } from '@/utils/cn';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import type { MediaDigestData } from '.';
import SelectedMediaCard from './SelectedMediaCard';

const TopBannerMediaList = () => {
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
    <div className="mx-auto w-[1342px]  px-[48px]">
      <h2 className="mb-[40px] text-center text-[20px] font-bold">
        "{selectedWord.keyword}" 키워드에 있었던 특별한 이슈
      </h2>
      <div
        className={cn('mb-[40px]  flex justify-center gap-[120px]', {
          'justify-evenly': mediaDigestData.length === 2,
          'justify-between': mediaDigestData.length === 3,
        })}
      >
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
      <p className="mb-[40px] text-center text-[20px] font-bold">
        "{selectedWord.keyword}" 키워드를 주제로 만든 영상들의 성과를 확인하고,
        소재를 결정하세요.
      </p>
    </div>
  );
};

export default TopBannerMediaList;
