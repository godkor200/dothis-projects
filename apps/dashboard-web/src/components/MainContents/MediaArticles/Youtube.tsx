import { useEffect, useMemo, useState } from 'react';

import useGetVideoData from '@/hooks/react-query/query/useGetVideoData';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externalYouTubeImageLoader } from '@/utils/imagesUtil';

import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import PaginationButtons from './PaginationButtons';
import SummaryCard from './SummaryCard';

const YouTube = () => {
  /**
   * @state 페이지 네이션을 위한 pageIndex상태를 추가하였습니다
   * @useEffect 연관어 변경 및 페이지 변경에 따른 index가 0으로 초기화 해야할 것 같아서 useEffect로 초기화를 해주었습니다! (지금 useEffect로 컨트롤하는게 사이드 이펙트가 있지않을까? 고민이 있어서.. 개선점이 있다면 언제든 피드백 환영입니다!!)
   */
  const [pageIndex, setPageIndex] = useState(0);
  const [contentIndex, setContentIndex] = useState(0);

  const seletedWord = useSelectedWord();
  useEffect(() => {
    setPageIndex(0);
    setContentIndex(0);
  }, [seletedWord]);

  useEffect(() => {
    setContentIndex(0);
  }, [pageIndex]);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const { data, isLoading } = useGetVideoData(seletedWord);

  /**
   * @validItems flatMap을 이용해서 useGetVideoData에서 얻은 data형식에서 MediaArticle을 그리는데 필요한 object만 flat하게 가져옵니다. (ex)[{videoObject},{videoObject},{videoObject}]
   */
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
      provider: item._source.channel_name,
      tags: item._source.video_tag,
      description: item._source.video_description,
    };
  });

  /**
   * @mediaDataList returnData로 포맷팅을 변환한 Object[] -> 페이지네이션에 맞게끔 포맷팅을 변경합니다! (ex)[Array(5),Array(5),Array(5),Array(5),Array(5)]
   * @jsx 밑에 jsx는 mediaDataList를 이용해서 prop으로 전달하도록 수정하였습니다.
   */
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
        {mediaDataList[pageIndex][contentIndex]?.description}
      </SummaryCard>
    </>
  );
};

export default YouTube;
