import dayjs from 'dayjs';
import { useCallback, useState } from 'react';

import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import { externaImageLoader, getMainImage } from '@/utils/imagesUtil';

import type { MediaDigestData } from '.';
import MediaDigestList from './MediaDigestList';

const News = () => {
  const {
    data: newsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetNewsInfiniteQuery();

  const handleFetchNextPage = useCallback(
    (isInview: boolean) => {
      if (isInview && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const flattenNewsData = newsData?.pages.flatMap(
    (item) => item.return_object.documents,
  );

  /**
   * @mediaDigestData api로 받아온 youtubeVideoData의 필요한 프로퍼티만 가져와서 포맷팅을 수정하는 코드
   * News 컴포넌트와 동일한 컴포넌트를(MediaDigest) 사용하기때문에 추가된 섹션
   */
  const mediaDigestData: MediaDigestData[] | undefined = flattenNewsData?.map(
    (item) => {
      return {
        title: item.title,
        provider: item.provider,
        element: item.category[0],
        uploadDate: dayjs(`${item.dateline}`).format('YYYY.MM.DD'),
        image: externaImageLoader(getMainImage(item.images)),
        link: item.provider_link_page,
        hilight: item.hilight,
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

  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <MediaDigestList.skeleton />
      </div>
    );
  }

  if (mediaDigestData?.length === 0 || !mediaDigestData) {
    return (
      <div className="mt-10 flex flex-wrap gap-[1.25rem]">
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          해당 키워드에 대한 뉴스기사가 없습니다
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="mt-10 flex  gap-[1.25rem] ">
        <div className="flex-1 ">
          <MediaDigestList
            mediaDigestData={mediaDigestData}
            handleSetSelectedMedia={handleSetSelectedMedia}
            handleFetchNextPage={handleFetchNextPage}
          />
        </div>
      </div>
      {/* <SummaryCard title="뉴스 요약">
        <ParserContent content={returnData[contentIndex]?.hilight} />
      </SummaryCard> */}
    </>
  );
};

export default News;
