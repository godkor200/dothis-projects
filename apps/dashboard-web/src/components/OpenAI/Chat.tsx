// 'use client';

// import { useChat } from 'ai/react';
// import dynamic from 'next/dynamic';
// import { useEffect, useRef } from 'react';

// import useGetNewsInfiniteQuery from '@/hooks/react-query/query/useGetNewsInfiniteQuery';
// import useGetVideoDataInfinityQuery from '@/hooks/react-query/query/useGetVideoDataInfinityQuery';
// import { useEndDate, useStartDate } from '@/store/dateStore';
// import { useGptOption, useGptOptionAction } from '@/store/gptOptionStore';
// import { useSelectedWord } from '@/store/selectedWordStore';

// const AnalysisWidgetItem = dynamic(
//   () => import('@/components/MainContents/AnalysisWidgetItem'),
//   { ssr: false },
// );

// export default function Chat() {
//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     setInput,
//     append,
//     isLoading,
//     stop,
//   } = useChat();

//   console.log(messages);
//   console.log(input);

//   const selectedWord = useSelectedWord();

//   const startDate = useStartDate();

//   const endDate = useEndDate();

//   /**
//    * openai form 태그의 submit 버튼에 연결되는 ref객체입니다.
//    */
//   const buttonRef = useRef<HTMLButtonElement>(null);

//   const {
//     dailyViewTendency,
//     totalDailyView,
//     videoCount,
//     expectedPercentage,
//     higherSubscribedChannelsCount,
//     relatedNews,
//     relatedVideo,
//   } = useGptOption();

//   /**
//    * openAI request 에 필수적으로 포함되어야하는 data들의 존재여부
//    */
//   const hasGptOptions =
//     dailyViewTendency !== null &&
//     totalDailyView !== null &&
//     videoCount !== null &&
//     expectedPercentage !== null &&
//     higherSubscribedChannelsCount !== null;

//   const { initializeGptOption } = useGptOptionAction();

//   /**
//    * 아래 Query들은 setInput에 trigger 및 조건에서 사용된다
//    */
//   const { isLoading: newsIsLoading } = useGetNewsInfiniteQuery();
//   const { isLoading: videoIsLoading } =
//     useGetVideoDataInfinityQuery(selectedWord);

//   /**
//    * 현재는 정규표현식으로 openai 프롬프트에 지정한 형식에 맞춰서 response text를 가져오는 형식으로 작업했습니다, (기존에 slice로 작업 시 디펜던시 문제로 인한 stream 형식으로 출력되지않는 문제가 있었지만, slice방식 에러 트랙킹 후 수정해서 리팩토링 예정)
//    */
//   const matchKeywordEvaluation = messages
//     .at(-1)
//     ?.content.match(/### 키워드 평가\n([\s\S]+?)(?:###|\n\n|$)/);
//   const matchContentRecommendations = messages
//     .at(-1)
//     ?.content.match(
//       /### 콘텐츠 주제 추천(?: ?\(\d+\))?\n([\s\S]+?)(?:###|\n\n|$)/,
//     );
//   // ?.content.match(/### 콘텐츠 주제 추천 \(3\)\n([\s\S]+?)(?:###|\n\n|$)/);
//   const matchDescription = messages
//     .at(-1)
//     ?.content.match(/### 상세 조언\n([\s\S]+?)(?:###|\n\n|$)/);

//   const responseKeywordEvaluation = matchKeywordEvaluation
//     ? matchKeywordEvaluation[1].trim()
//     : null;

//   const responseContentRecommendations = matchContentRecommendations
//     ? matchContentRecommendations[1].trim()
//     : null;
//   const responsematchDescription = matchDescription
//     ? matchDescription[1].trim()
//     : null;

//   /**
//    * openAI Response를 Match한 데이터의 case별 text 포맷팅을 수정하는 함수
//    */
//   const handleOpenAIResponse = (response: string | null) =>
//     input && !isLoading
//       ? '집계 중 오류가 발생했습니다.'
//       : response
//       ? response
//       : '집계 중 ';

//   /**
//    * openAIDataPrimary, openAIDataSecondary 두 개로 구분한 이유는 디자인을 충족하기 위해 2개의 block 나눠서 마크업을 진행했기 때문입니다.
//    */
//   const openAIDataPrimary = [
//     {
//       title:
//         selectedWord.keyword && selectedWord.relword
//           ? `${selectedWord.keyword} & ${selectedWord.relword}`
//           : '집계 중',
//       content: '키워드 종합 평가',
//       hasTooltip: false,
//       tooltipText: '',
//     },

//     {
//       title: handleOpenAIResponse(responseKeywordEvaluation),

//       content: '키워드 종합 평가',
//       hasTooltip: false,
//       tooltipText: '',
//     },
//     {
//       title: handleOpenAIResponse(responsematchDescription),

//       content: '상세 조언, 평가',
//       hasTooltip: false,
//       tooltipText:
//         '기대 조회수란, 검색된 영상들의 성과와 사용자 채널의 평균 조회수를 바탕으로 계산한 조회수 예측 값입니다. \n 검색된 키워드를 주제로 영상을 만들면 해당 조회수 만큼 얻을 것으로 예상됩니다.',
//     },
//   ];

//   const openAIDataSecondary = [
//     {
//       title: hasGptOptions
//         ? `일일 조회수 합계: ${totalDailyView} 회 \n 일일 조회수 추이: ${dailyViewTendency} % 증가 \n 발행된 영상 수: ${videoCount} \n 내 채널보다 구독자가 많은 채널 수: ${higherSubscribedChannelsCount} \n 채널의 평균 조회수 대비 영상 조회수 비율: ${expectedPercentage}%`
//         : `집계 중`,
//       content: '요약',
//       hasTooltip: false,
//       tooltipText:
//         '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
//     },
//     {
//       title: handleOpenAIResponse(responseContentRecommendations),
//       content: '콘텐츠 주제 추천',
//       hasTooltip: false,
//       tooltipText:
//         '경쟁 강도란, 검색된 키워드로 영상을 만들 시, 경쟁해야 하는 영상에 비해 시청자의 관심이 많은 주제인지에 대해 나타내는 지표입니다. \n 경쟁에 유리하면 "좋음", 불리하면 "나쁨"으로 표기됩니다.',
//     },
//   ];

//   /**
//    * @function stop openAI의 request를 강제로 정지하도록 하는 함수이다,
//    * @function initializeGptOption 전역으로 설정한 gptOption을 다시 초기화하는 함수이다.
//    * @description stop -> stop은 중간에 연관어 혹은 탐색어가 변경이 되었을 때 openAI의 request를 정지하기 위해 작성 (해당 request를 정지하지않으면 messages 상태가 꼬여서 렌더링되는 버그 발생)
//    * @description initializeGptOption -> initializeGptOption를 초기화 해주지않으면 hasGptOptions 설정이 지속적으로 true가 되어 다음 연관어에 대한 state가 업데이트 되지않아도 setInput이 실행되는 현상이 있음.
//    */
//   useEffect(() => {
//     stop();
//     initializeGptOption();
//   }, [selectedWord.keyword, selectedWord.relword]);

//   /**
//    * @hasGptOption openAI 프롬프트에 보낼 state가 전부 update가 되었을 때 setInput을 하기 위한 trigger
//    * @newsIsLoading openAI 프롬프트에 보낼 Related news state의 query가 종료되었을 경우를 파악하기 위한 tigger (news 데이터가 빈배열일 경우도 있어서 배열로써는 체크하지않음)
//    * @videoIsLoading newsIsLoading과 동일
//    * @isLoading openAI에 request가 진행 중인지 여부를 파악하는 변수, isLoading시 중복으로 setInput을 하기위한 처리를 방지하기 위해서 삽입 (input이 갱신되면 auto submit함수가 실행되기때문에 필요)
//    */
//   useEffect(() => {
//     if (hasGptOptions && !newsIsLoading && !videoIsLoading && !isLoading) {
//       setInput(`
//       Analysis Keywords: ${selectedWord.keyword}&${selectedWord.relword}
//       Analysis period: ${startDate} ~ ${endDate}
//       Trend of daily views of all content: ${totalDailyView} (${dailyViewTendency}% increase)
//       Number of published content: ${videoCount}
//       Channels with more subscribers than me: ${higherSubscribedChannelsCount}
//       Average ratio of content views to channel's typical views: ${expectedPercentage}%
//       Related news:
//       ${relatedNews.map((item, index) => `${index + 1}. ${item}  \n`).join('')}
//       Related high-performance videos:
//       ${relatedVideo.map((item, index) => `${index + 1}. ${item} \n`).join('')}
//       `);
//     }
//   }, [
//     dailyViewTendency,
//     totalDailyView,
//     videoCount,
//     expectedPercentage,
//     higherSubscribedChannelsCount,
//     newsIsLoading,
//     videoIsLoading,
//   ]);

//   /**
//    * @buttonRef  openAI 프롬프트에 form submit에 해당하는 tag
//    * @description input이 변경이 되었을 시 form auto submit하는 함수
//    */
//   useEffect(() => {
//     if (buttonRef.current) {
//       // openAI 프롬프트에 들어가는 input이 변경이 되었을 시 form submit하는 함수
//       buttonRef.current!.click();
//     }
//   }, [input]);

//   return (
//     <>
//       {/* user와 ai 질문에 대한 tag  (디버깅용)*/}
//       {/* <ul>
//         {messages.map((m, index) => (
//           <li key={index} className="whitespace-pre-line">
//             {m.role === 'user' ? 'User: ' : 'AI: '}
//             {m.content}
//           </li>
//         ))}
//       </ul> */}
//       {/* <p className="whitespace-pre-line">{messages.at(-1)?.content}</p> */}

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleSubmit(e);
//         }}
//         className="invisible h-0"
//       >
//         <label>
//           Say something...
//           <textarea
//             value={input}
//             className="block h-[500px] w-full"
//             onChange={handleInputChange}
//           />
//         </label>
//         <button type="submit" ref={buttonRef}>
//           Send
//         </button>
//       </form>

//       <div className="mt-4 flex  gap-[20px]">
//         <ul className="flex shrink-0 basis-3/5  flex-wrap items-start gap-[20px] [&>*:nth-child(3)]:min-h-[278px] [&>*:nth-child(3)]:basis-full">
//           {openAIDataPrimary?.map(
//             ({ title, content, hasTooltip, tooltipText }, index) => (
//               <AnalysisWidgetItem
//                 key={index}
//                 title={title}
//                 content={content}
//                 hasTooltip={hasTooltip}
//                 tooltipText={tooltipText}
//               />
//             ),
//           )}
//         </ul>
//         <ul className="flex grow flex-wrap  gap-[20px] [&>*]:min-h-[160px]">
//           {openAIDataSecondary?.map(
//             ({ title, content, hasTooltip, tooltipText }, index) => (
//               <AnalysisWidgetItem
//                 key={index}
//                 title={title}
//                 content={content}
//                 hasTooltip={hasTooltip}
//                 tooltipText={tooltipText}
//               />
//             ),
//           )}
//         </ul>
//       </div>
//     </>
//   );
// }
