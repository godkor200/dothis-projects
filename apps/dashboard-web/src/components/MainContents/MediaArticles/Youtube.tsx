import { useCallback, useEffect, useState } from 'react';

import TooltipComponent from '@/components/common/Tooltip/Tooltip';
import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import useGetVideoInformation from '@/hooks/react-query/query/useGetVideoInformation';
import { useSelectedWord } from '@/store/selectedWordStore';
import { externalYouTubeImageLoader } from '@/utils/imagesUtil';

import AnalysisWidgetItem from '../AnalysisWidgetItem';
import ArticleList from './ArticleList';
import CurrentArticle from './CurrentArticle';
import SummaryCard from './SummaryCard';

const YouTube = () => {
  const [contentIndex, setContentIndex] = useState(0);

  const [lastId, setLastId] = useState<string | undefined>('');

  const seletedWord = useSelectedWord();

  const {
    data: scrollData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
  } = useGetVideoDataInfinityQuery(seletedWord, lastId);

  useEffect(() => {
    setLastId(scrollData?.at(-1)?._id);
  }, [JSON.stringify(scrollData)]);

  const handleSetContentIndex = (index: number) => {
    setContentIndex(index);
  };

  const onChange = useCallback(
    (isInview: boolean) => {
      if (isInview && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  const returnData = scrollData?.map((item) => {
    const compactNumber = new Intl.NumberFormat('ko', {
      notation: 'compact',
    });
    return {
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

  const { data: videoInfo } = useGetVideoInformation({
    videoId: scrollData && scrollData[contentIndex]?._id,
    clusterNumber:
      scrollData && scrollData[contentIndex]?._source.video_cluster,
  });

  const channel_InfoData = [
    {
      title: '채널 구독자',
      content: `${
        videoInfo?.channelPerformance.subscribers.toLocaleString('ko-KR') || 0
      }명`,
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: '채널 평균 조회 수',
      content: `${
        videoInfo?.channelPerformance.averageViews.toLocaleString('ko-kr', {
          maximumFractionDigits: 0,
        }) || 0
      }회`,
      hasTooltip: false,
      tooltipText: '',
    },
  ];

  const videoPerformance = [
    {
      title: '기대 조회수',
      content: `${
        videoInfo?.videoPerformance.expectedViews.toLocaleString('ko-KR', {
          maximumFractionDigits: 2,
        }) || 0
      }회`,
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: '참여도',
      content: convertParticipationRateFormat(
        videoInfo?.videoPerformance.participationRate,
      ),
      hasTooltip: true,
      tooltipText:
        '영상의 조회수 대비 영상에 댓글, 좋아요 등으로 참여한 시청자의 수를 나타내는 지표입니다. \n 시청자 반응이 뜨거운 주제인지 확인하세요.',
    },
  ];

  /**
   * 밑에 주석들은 기존 useGetVideoData로 페이지네이션을 구성했을 때의 코드입니다.
   *
   * @state 페이지 네이션을 위한 pageIndex상태를 추가하였습니다
   * @useEffect 연관어 변경 및 페이지 변경에 따른 index가 0으로 초기화 해야할 것 같아서 useEffect로 초기화를 해주었습니다! (지금 useEffect로 컨트롤하는게 사이드 이펙트가 있지않을까? 고민이 있어서.. 개선점이 있다면 언제든 피드백 환영입니다!!)
   */

  /**
   * @validItems flatMap을 이용해서 useGetVideoData에서 얻은 data형식에서 MediaArticle을 그리는데 필요한 object만 flat하게 가져옵니다. (ex)[{videoObject},{videoObject},{videoObject}]
   * const validItems = data.flatMap((item) => (item ? item?.data : []));  무한스크롤추가로 인한 비활성화
   */

  /**
   * @mediaDataList returnData로 포맷팅을 변환한 Object[] -> 페이지네이션에 맞게끔 포맷팅을 변경합니다! (ex)[Array(5),Array(5),Array(5),Array(5),Array(5)]
   * @jsx 밑에 jsx는 mediaDataList를 이용해서 prop으로 전달하도록 수정하였습니다.
   * const mediaDataList = useMemo(() => {
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
   * 무한스크롤 추가로 인한 비활성화
   */

  // 현재 데이터 페이지 인덱스가 clusternumber인데,  한페이지만 보여주고 있어서 임의로 하나만 지정했습니다. 하지만 해당 clusternumber에 에러가 있을 시 계속 skeleton UI 만 나오는 현상이 있을 수 있어서 에러바운더리를 설정해주는게 좋습니다
  if (isLoading) {
    return (
      <div className="mt-10 flex gap-[1.25rem]">
        <CurrentArticle.skeleton />
        <ArticleList.skeleton />
      </div>
    );
  }

  if (returnData === undefined || returnData?.length === 0) {
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
          title={returnData[contentIndex]?.title}
          category={returnData[contentIndex]?.category}
          provider={returnData[contentIndex]?.provider}
          date={returnData[contentIndex]?.date}
          image={returnData[contentIndex]?.image}
          link={returnData[contentIndex]?.link}
        />
        <div className="flex-1">
          <ArticleList
            articleListData={returnData}
            handleSetContentIndex={handleSetContentIndex}
            onChange={onChange}
          />
        </div>
      </div>
      <SummaryCard title="영상 태그">
        <div className="flex flex-wrap gap-[10px] ">
          {videoInfo &&
            JSON.parse(videoInfo?.videoTags.replace(/'/g, '"'))
              .slice(0, 10)
              .map((item: string) => (
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
        {returnData[contentIndex]?.description}
      </SummaryCard>

      <SummaryCard title="영상 성과" marginTop="mt-5">
        <ul className="flex gap-[20px]">
          {videoPerformance.map((item) => (
            <AnalysisWidgetItem
              title={item.title}
              content={item.content}
              key={item.title}
              hasTooltip={item.hasTooltip}
              tooltipText={item.tooltipText}
            />
          ))}
        </ul>

        <div className="border-grey400 rounded-8 mt-[30px] border px-[30px] py-[40px]">
          <div className="flex gap-[4px]">
            <p className="text-grey700 text-[24px] font-bold">
              영상 조회수 성장 예측
            </p>
            <TooltipComponent title="영상 데이터가 부족하면 그래프가 완성되지 않을 수 있습니다." />
          </div>

          <div className="flex h-[340px] w-full justify-between">
            <p className="text-t2 flex w-full items-center justify-center text-center font-bold">
              데이터가 부족합니다.
            </p>
          </div>
        </div>
      </SummaryCard>

      <SummaryCard title="채널 성과" marginTop="mt-5">
        <ul className="flex gap-[20px]">
          {channel_InfoData.map((item) => (
            <AnalysisWidgetItem
              title={item.title}
              content={item.content}
              key={item.title}
              hasTooltip={item.hasTooltip}
              tooltipText={item.tooltipText}
            />
          ))}
        </ul>
      </SummaryCard>
    </>
  );
};

export default YouTube;

const convertParticipationRateFormat = (
  participationRate: number | undefined,
) => {
  if (participationRate === undefined) {
    return '파악중';
  }

  if (participationRate > 10) {
    return '아주 좋음 😄';
  } else if (participationRate > 5) {
    return '좋음 😊';
  } else if (participationRate > 2) {
    return '보통 🙂';
  } else if (participationRate > 1) {
    return '나쁨 🙁';
  } else if (participationRate >= 0) {
    return '매우 나쁨 ☹';
  }
  return '파악중';
};
