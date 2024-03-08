import TooltipComponent from '@/components/common/Tooltip/Tooltip';
import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import useGetVideoInformation from '@/hooks/react-query/query/useGetVideoInformation';
import { useSelectedWord } from '@/store/selectedWordStore';

import AnalysisWidgetItem from '../AnalysisWidgetItem';
import SummaryCard from './SummaryCard';

interface Props {
  selectedIndex: number;
}

const YoutubeDetail = ({ selectedIndex }: Props) => {
  const selectedWord = useSelectedWord();

  const { data: youtubeVideoData } = useGetVideoDataInfinityQuery(selectedWord);

  const { data: videoInfo } = useGetVideoInformation({
    videoId: youtubeVideoData && youtubeVideoData[selectedIndex].videoId,
    clusterNumber:
      youtubeVideoData && youtubeVideoData[selectedIndex].videoCluster,
  });

  const channel_InfoData = [
    {
      title: '채널 구독자',
      content: `${
        videoInfo?.channelPerformance.subscribers?.toLocaleString('ko-KR') || 0
      }명`,
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: '채널 평균 조회 수',
      content: `${
        videoInfo?.channelPerformance.averageViews?.toLocaleString('ko-kr', {
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
        videoInfo?.videoPerformance.expectedViews?.toLocaleString('ko-KR', {
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

  return (
    <>
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
        <p className=" break-words">
          {youtubeVideoData &&
            youtubeVideoData[selectedIndex]?.videoDescription}
        </p>
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

export default YoutubeDetail;

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
