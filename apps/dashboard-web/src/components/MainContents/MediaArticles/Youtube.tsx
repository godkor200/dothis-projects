import { useEffect, useMemo, useState } from 'react';

import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import { useSelectedRelWord } from '@/store/selectedRelWordStore';
import { externalYouTubeImageLoader } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import PaginationButtons from './PaginationButtons';
import SummaryCard from './SummaryCard';

const YouTube = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  const seletecRelWord = useSelectedRelWord();
  useEffect(() => {
    setPageIndex(0);
    setContentIndex(0);
  }, [seletecRelWord]);

  useEffect(() => {
    setContentIndex(0);
  }, [pageIndex]);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data, isLoading } = useGetVideoData();

  // 페이지에 대한 개념을 고려해서 수정하도록 해야함.
  const validItems = data.flatMap((item) => (item ? item?.data : []));

  const returnData = validItems.map((item) => {
    const compactNumber = new Intl.NumberFormat('ko', {
      notation: 'compact',
    });
    return {
      isLoading: isLoading,
      title: item._source.video_title,
      category: `조회수 ${compactNumber.format(
        item._source.video_history.sort(
          (a, b) => b.video_views - a.video_views,
        )[0].video_views,
      )} `,
      image: externalYouTubeImageLoader(item._source.video_id),
      date: item._source.video_published,
      link: item._source.video_url,
      provider: item._source.video_category,
      tags: item._source.video_tag,
      description: item._source.video_description,
    };
  });

  const mediaDataList = useMemo(() => {
    return returnData?.reduce(
      (
        result: (typeof returnData)[],
        item: (typeof returnData)[0],
        index: number,
      ) => {
        const chunkIndex: number = Math.floor(index / 5);
        if (!result[chunkIndex]) {
          result[chunkIndex] = [];
        }

        result[chunkIndex].push(item);
        return result;
      },
      [],
    );
  }, [data]);

  console.log(returnData);
  console.log(mediaDataList);

  // 현재 데이터 페이지 인덱스가 clusternumber인데,  한페이지만 보여주고 있어서 임의로 하나만 지정했습니다. 하지만 해당 clusternumber에 에러가 있을 시 계속 skeleton UI 만 나오는 현상이 있을 수 있어서 에러바운더리를 설정해주는게 좋습니다
  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle.skeleton />
        <ArticleList.skeleton />
      </div>
    );
  }

  if (
    returnData === undefined ||
    returnData?.length === 0 ||
    mediaDataList === undefined ||
    mediaDataList.length === 0
  ) {
    return (
      <div className="mt-10 flex flex-wrap gap-[1.25rem]">
        <p className="text-t2 flex h-60 w-full items-center justify-center text-center font-bold">
          해당 키워드에 대한 동영상이 없습니다
        </p>
      </div>
    );
  }

  console.log(mediaDataList[pageIndex][contentIndex]);

  return (
    <>
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle
          title={mediaDataList[pageIndex][contentIndex]?.title}
          category={mediaDataList[pageIndex][contentIndex]?.category}
          provider={mediaDataList[pageIndex][contentIndex]?.provider}
          date={mediaDataList[pageIndex][contentIndex]?.date}
          image={mediaDataList[pageIndex][contentIndex]?.image}
          link={mediaDataList[pageIndex][contentIndex]?.link}
        />
        <div>
          <ArticleList
            articleListData={mediaDataList[pageIndex]}
            handleSetContentIndex={handleSetContentIndex}
          />
          <PaginationButtons
            length={mediaDataList.length}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </div>
      </div>
      <SummaryCard title="영상 태그">
        <div className="flex flex-wrap gap-[10px]">
          {mediaDataList[pageIndex][contentIndex]?.tags
            ?.replace(/'|\[|\]/g, '')
            ?.split(', ')
            ?.map((item) => (
              <>
                {item.length <= 10 && (
                  <div className="bg-grey200 text-grey600 rounded-8 px-5 py-2 font-bold">
                    {item}
                  </div>
                )}
              </>
            ))}
        </div>
      </SummaryCard>
      <SummaryCard title="영상 내용 요약" marginTop="mt-5">
        {mediaDataList[pageIndex][contentIndex].description}
      </SummaryCard>
    </>
  );
};

export default YouTube;
