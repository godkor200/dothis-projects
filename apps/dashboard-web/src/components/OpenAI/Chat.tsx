'use client';

import { useChat } from 'ai/react';
import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';

import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useGptOption, useGptOptionAction } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';

const AnalysisWidgetItem = dynamic(
  () => import('@/components/MainContents/AnalysisWidgetItem'),
  { ssr: false },
);

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setInput,
    append,
    isLoading,
    stop,
  } = useChat();

  const selectedWord = useSelectedWord();

  const startDate = useStartDate();

  const endDate = useEndDate();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const {
    dailyViewTendency,
    totalDailyView,
    videoCount,
    competitionScore,
    higherSubscribedChannelsCount,
    relatedNews,
    relatedVideo,
  } = useGptOption();

  const { initializeGptOption } = useGptOptionAction();

  /**
   * 아래 Query들은 setInput에 trigger 및 조건에서 사용된다
   */
  const { isLoading: newIsLoading } = useGetNewsInfiniteQuery();

  const { isLoading: videoIsLoading } =
    useGetVideoDataInfinityQuery(selectedWord);

  const matchKeywordEvaluation = messages
    .at(-1)
    ?.content.match(/### 키워드 평가\n([\s\S]+?)(?:###|\n\n|$)/);
  const matchContentRecommendations = messages
    .at(-1)
    ?.content.match(
      /### 콘텐츠 주제 추천(?: ?\(\d+\))?\n([\s\S]+?)(?:###|\n\n|$)/,
    );
  // ?.content.match(/### 콘텐츠 주제 추천 \(3\)\n([\s\S]+?)(?:###|\n\n|$)/);
  const matchDescription = messages
    .at(-1)
    ?.content.match(/### 상세 조언\n([\s\S]+?)(?:###|\n\n|$)/);

  //   슬라이스를 다시 찾아보자

  const responseKeywordEvaluation = matchKeywordEvaluation
    ? matchKeywordEvaluation[1].trim()
    : null;

  const responseContentRecommendations = matchContentRecommendations
    ? matchContentRecommendations[1].trim()
    : null;
  const responsematchDescription = matchDescription
    ? matchDescription[1].trim()
    : null;

  /**
   * openAIDataPrimary, openAIDataSecondary 두 개로 구분한 이유는 디자인을 충족하기 위해 2개의 block 나눠서 마크업을 진행했기 때문입니다.
   */
  const openAIDataPrimary = [
    {
      title:
        selectedWord.keyword !== null && selectedWord.relword !== null
          ? `${selectedWord.keyword} & ${selectedWord.relword}`
          : '집계 중',
      content: '키워드 종합 평가',
      hasTooltip: false,
      tooltipText: '',
    },

    {
      title:
        input && !isLoading
          ? '집계 중 오류가 발생했습니다.'
          : responseKeywordEvaluation
          ? responseKeywordEvaluation
          : '집계 중',
      content: '키워드 종합 평가',
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title:
        input && !isLoading
          ? '집계 중 오류가 발생했습니다.'
          : responsematchDescription
          ? responsematchDescription
          : '집계 중',
      content: '상세 조언, 평가',
      hasTooltip: false,
      tooltipText:
        '기대 조회수란, 검색된 영상들의 성과와 사용자 채널의 평균 조회수를 바탕으로 계산한 조회수 예측 값입니다. \n 검색된 키워드를 주제로 영상을 만들면 해당 조회수 만큼 얻을 것으로 예상됩니다.',
    },
  ];

  const openAIDataSecondary = [
    {
      title:
        dailyViewTendency !== null &&
        totalDailyView !== null &&
        videoCount !== null &&
        competitionScore !== null &&
        higherSubscribedChannelsCount !== null
          ? `일일 조회수 합계: ${totalDailyView} 회 \n 일일 조회수 추이: ${dailyViewTendency} % 증가 \n 발행된 영상 수: ${videoCount} \n 내 채널보다 구독자가 많은 채널 수: ${higherSubscribedChannelsCount} \n 채널의 평균 조회수 대비 영상 조회수 비율: ${competitionScore}%`
          : `집계 중`,
      content: '요약',
      hasTooltip: false,
      tooltipText:
        '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
    },
    {
      title:
        input && !isLoading
          ? '집계 중 오류가 발생했습니다.'
          : responseContentRecommendations
          ? responseContentRecommendations
          : '집계 중',

      content: '콘텐츠 주제 추천',
      hasTooltip: false,
      tooltipText:
        '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
    },
  ];

  useEffect(() => {
    stop();
    initializeGptOption();
  }, [selectedWord.keyword, selectedWord.relword]);

  useEffect(() => {
    // if (isLoading) {
    //   stop();
    // }

    if (
      dailyViewTendency !== null &&
      totalDailyView !== null &&
      videoCount !== null &&
      competitionScore !== null &&
      higherSubscribedChannelsCount !== null &&
      !newIsLoading &&
      !videoIsLoading &&
      !isLoading
    ) {
      setInput(`
      Analysis Keywords: ${selectedWord.keyword}&${selectedWord.relword}
      Analysis period: ${startDate} ~ ${endDate}
      Trend of daily views of all content: ${totalDailyView} (${dailyViewTendency}% increase)
      Number of published content: ${videoCount}
      Channels with more subscribers than me: ${higherSubscribedChannelsCount}
      Average ratio of content views to channel's typical views: ${competitionScore}%
      Related news:
      ${relatedNews.map((item, index) => `${index + 1}. ${item}  \n`).join('')}
      Related high-performance videos:
      ${relatedVideo.map((item, index) => `${index + 1}. ${item} \n`).join('')}
      `);
    }
  }, [
    dailyViewTendency,
    totalDailyView,
    videoCount,
    competitionScore,
    higherSubscribedChannelsCount,
    newIsLoading,
    videoIsLoading,
  ]);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current!.click();
      // initializeGptOption();
    }
  }, [input]);

  return (
    <>
      {/* user와 ai 질문에 대한 tag */}
      {/* <ul>
        {messages.map((m, index) => (
          <li key={index} className="whitespace-pre-line">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul> */}

      {/* <p className="whitespace-pre-line">{messages.at(-1)?.content}</p> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="invisible h-0"
      >
        <label>
          Say something...
          <textarea
            value={input}
            className="block h-[500px] w-full"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" ref={buttonRef}>
          Send
        </button>
      </form>

      <div className="mt-4 flex  gap-[20px]">
        <ul className="flex shrink-0 basis-3/5  flex-wrap items-start gap-[20px] [&>*:nth-child(3)]:min-h-[278px] [&>*:nth-child(3)]:basis-full">
          {openAIDataPrimary?.map(
            ({ title, content, hasTooltip, tooltipText }, index) => (
              <AnalysisWidgetItem
                key={index}
                title={title}
                content={content}
                hasTooltip={hasTooltip}
                tooltipText={tooltipText}
              />
            ),
          )}
        </ul>
        <ul className="flex grow flex-wrap  gap-[20px] [&>*]:min-h-[160px]">
          {openAIDataSecondary?.map(
            ({ title, content, hasTooltip, tooltipText }, index) => (
              <AnalysisWidgetItem
                key={index}
                title={title}
                content={content}
                hasTooltip={hasTooltip}
                tooltipText={tooltipText}
              />
            ),
          )}
        </ul>
      </div>
    </>
  );
}
