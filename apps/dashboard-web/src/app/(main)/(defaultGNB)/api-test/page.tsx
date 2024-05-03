'use client';

import KeywordRankingList from '@/components/MainContents/InfoChartAndRanking/KeywordRankingList';
import KeywordSlide from '@/components/MainContents/KeywordSearch/KeywordSlide';

import AdAnalysisBox from './AdAnalysisBox';
import DailyViewBox from './DailyViewBox';
import DurationViewsBox from './DurationViewsBox';
import InfluentialChannelBox from './InfluentialChannelBox';
import PerformanceBox from './PerformanceBox';
import SuccessRateBox from './SuccessRateBox';

const Page = () => {
  return (
    <div className=" min-h-screen p-10">
      <h1 className="my-5 text-[20px] font-bold">테스트 페이지 입니다</h1>
      <KeywordSlide />

      <KeywordRankingList />

      <DailyViewBox />

      <SuccessRateBox />

      <PerformanceBox />

      <DurationViewsBox />

      <InfluentialChannelBox />

      <AdAnalysisBox />
    </div>
  );
};

export default Page;
