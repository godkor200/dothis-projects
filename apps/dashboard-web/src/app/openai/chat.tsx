'use client';

import { useChat } from 'ai/react';
import dynamic from 'next/dynamic';
import type { FormEvent } from 'react';
import { useEffect, useRef } from 'react';

import Card from '@/components/MainContents/Card';
import CardHeader from '@/components/MainContents/CardHeader';
import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useGptOption } from '@/store/gptOptionStore';
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
    reload,
    setInput,
    append,
    isLoading,
  } = useChat();

  const selectedWord = useSelectedWord();
  const {
    dailyViewTendency,
    totalDailyView,
    videoCount,
    competitionScore,
    higherSubscribedChannelsCount,
    relatedNews,
    relatedVideo,
  } = useGptOption();

  const { isLoading: newIsLoading } = useGetNewsInfiniteQuery();

  const seletedWord = useSelectedWord();

  const { isLoading: videoIsLoading } =
    useGetVideoDataInfinityQuery(seletedWord);

  // 쿼리들의 isLoading으로 판별하자.

  useEffect(() => {
    if (
      dailyViewTendency !== null &&
      totalDailyView !== null &&
      videoCount !== null &&
      competitionScore !== null &&
      higherSubscribedChannelsCount !== null &&
      !newIsLoading &&
      !videoIsLoading
    ) {
      setInput(`
      Analysis Keywords: ${keyword}&${relword}
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
    if (formRef.current) {
      formRef.current!.click();
    }
  }, [input]);

  const formRef = useRef<HTMLButtonElement>(null);

  let matchKeywordEvaluation = messages
    .at(-1)
    ?.content.match(/### 키워드 평가\n([\s\S]+?)(?:###|\n\n|$)/);
  let matchContentRecommendations = messages
    .at(-1)
    ?.content.match(/### 콘텐츠 주제 추천 \(3\)\n([\s\S]+?)(?:###|\n\n|$)/);
  let matchDescription = messages
    .at(-1)
    ?.content.match(/### 상세 조언\n([\s\S]+?)(?:###|\n\n|$)/);
  // ?.content.match(/### 콘텐츠 주제 추천 (3)\n([\s\S]+?)(?:\n\n###|$)/);

  // ?.content.match(/### 콘텐츠 주제 추천 \(3\)\n([\s\S]+)$/);

  //   슬라이스를 다시 찾아보자

  //   컨텐츠 주제 추천
  let var1 = matchKeywordEvaluation ? matchKeywordEvaluation[1].trim() : null;

  let var2 = matchContentRecommendations
    ? matchContentRecommendations[1].trim()
    : null;
  let var3 = matchDescription ? matchDescription[1].trim() : null;

  const analysisData = [
    {
      title: `${selectedWord.keyword} & ${selectedWord.relword}`,
      content: '키워드 종합 평가',
      hasTooltip: false,
      tooltipText: '',
    },

    {
      title: var1,
      content: '키워드 종합 평가',
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: var3,
      content: '상세 조언, 평가',
      hasTooltip: false,
      tooltipText:
        '기대 조회수란, 검색된 영상들의 성과와 사용자 채널의 평균 조회수를 바탕으로 계산한 조회수 예측 값입니다. \n 검색된 키워드를 주제로 영상을 만들면 해당 조회수 만큼 얻을 것으로 예상됩니다.',
    },
  ];

  const analy = [
    {
      title: `일일 조회수 합계: ${totalDailyView} 회 \n 일일 조회수 추이: ${dailyViewTendency} % 증가 \n 발행된 영상 수: ${videoCount} \n 내 채널보다 구독자가 많은 채널 수: ${higherSubscribedChannelsCount} \n 채널의 평균 조회수 대비 영상 조회수 비율: ${competitionScore}%`,
      content: '요약',
      hasTooltip: false,
      tooltipText:
        '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
    },
    {
      title: var2,
      content: '콘텐츠 주제 평가',
      hasTooltip: false,
      tooltipText:
        '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
    },
  ];
  const { keyword, relword } = useSelectedWord();

  const startDate = useStartDate();
  const endDate = useEndDate();

  const handleTest = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div>
      {/* user와 ai 질문에 대한 tag */}
      {/* <ul>
        {messages.map((m, index) => (
          <li key={index} className="whitespace-pre-line">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className="invisible"
      >
        <label>
          Say something...
          <textarea
            value={input}
            className="block h-[500px] w-full"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" ref={formRef}>
          Send
        </button>
      </form>

      <Card>
        <CardHeader title="콘텐츠 소재">
          <div className="flex items-start gap-[20px]">
            <ul className="flex shrink-0 basis-3/5  flex-wrap items-start gap-[20px] [&>*:nth-child(3)]:min-h-[278px] [&>*:nth-child(3)]:basis-full">
              {analysisData?.map(
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
            <ul className="flex grow flex-wrap items-start gap-[20px] [&>*]:min-h-[160px]">
              {analy?.map(
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
        </CardHeader>
      </Card>
    </div>
  );
}
