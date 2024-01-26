'use client';

import { useChat } from 'ai/react';
import { useEffect } from 'react';

import AnalysisWidgetItem from '@/components/MainContents/AnalysisWidgetItem';
import Card from '@/components/MainContents/Card';
import CardHeader from '@/components/MainContents/CardHeader';
import useKeyword from '@/hooks/user/useKeyword';
import { useEndDate, useStartDate } from '@/store/dateStore';
import { useGptOption } from '@/store/gptOptionStore';
import { useSelectedWord } from '@/store/selectedWordStore';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, setInput, append } =
    useChat();

  const {
    dailyViewTendency,
    totalDailyView,
    videoCount,
    competitionScore,
    higherSubscribedChannelsCount,
    relatedNews,
    relatedVideo,
  } = useGptOption();

  useEffect(() => {}, []);

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
      title: var1,
      content: '키워드 평가',
      hasTooltip: false,
      tooltipText: '',
    },
    {
      title: var2,
      content: '콘텐츠 주제 추천',
      hasTooltip: false,
      tooltipText:
        '기대 조회수란, 검색된 영상들의 성과와 사용자 채널의 평균 조회수를 바탕으로 계산한 조회수 예측 값입니다. \n 검색된 키워드를 주제로 영상을 만들면 해당 조회수 만큼 얻을 것으로 예상됩니다.',
    },
    {
      title: var3,
      content: '상세 조언, 평가',
      hasTooltip: false,
      tooltipText:
        '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
    },
  ];

  const { keyword, relword } = useSelectedWord();

  const startDate = useStartDate();
  const endDate = useEndDate();

  return (
    <div>
      <button
        className="block"
        onClick={() =>
          setInput(`
          Analysis Keywords: ${keyword}&${relword}
          Analysis period: ${startDate} ~ ${endDate}
          Trend of daily views of all content: ${totalDailyView} (${dailyViewTendency}% increase)
          Number of published content: ${videoCount}
          Channels with more subscribers than me: ${higherSubscribedChannelsCount}
          Average ratio of content views to channel's typical views: ${competitionScore}%
          Related news:
          ${relatedNews
            .map((item, index) => `${index + 1}. ${item}  \n`)
            .join('')}
          Related high-performance videos:
          ${relatedVideo
            .map((item, index) => `${index + 1}. ${item} \n`)
            .join('')}
          `)
        }
      >
        클릭미
      </button>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <textarea
            value={input}
            className="block h-[500px] w-full"
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>

      <Card>
        <CardHeader title="콘텐츠 소재">
          <ul className="flex gap-[12px]">
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
        </CardHeader>
        <div className="flex">
          <div>콘텐츠 내용</div>
        </div>
      </Card>

      <div>{var1}</div>
      <div>{var2}</div>
      <div>{var3}</div>
    </div>
  );
}
