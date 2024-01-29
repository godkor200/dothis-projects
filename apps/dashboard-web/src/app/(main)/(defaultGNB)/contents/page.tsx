import type { Metadata, ResolvingMetadata } from 'next';

import TabNavigation from '@/components/common/TabNavigation';
import Card from '@/components/MainContents/Card';
import CardHeader from '@/components/MainContents/CardHeader';
import KeywordAnalyticsView from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import KeywordRankingList from '@/components/MainContents/InfoChartAndRanking/KeywordRankingList';
import MediaArticlesContainer from '@/components/MainContents/MediaArticles/MediaArticlesContainer';
import MonthlyViewData from '@/components/MainContents/MonthlyContentReport/MonthlyViewData';
import Container from '@/components/MainOverallView/RelatedWordList/Container';
import { CATEGORY_TABNAV_DATA } from '@/constants/TabNav';
import { MEDIA_TABNAV_DATA } from '@/constants/TabNav';

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const keyword = searchParams.keyword;

  // fetch data
  // const product = await fetch(`https://.../${id}`).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];
  if (keyword) {
    return {
      // title: '두디스 - 데이터 기반 영상 기획 도구',
      title: `${keyword} 관련 콘텐츠 분석 | 시청자 데이터 기반 콘텐츠 분석 두디스`,
      description: `${keyword}에 대한 분석 결과입니다. ${keyword} 관련 콘텐츠의 실시간 시청자 반응을 파악하고 알맞는 콘텐츠를 기획하세요.`,
      keywords: `${keyword} 두디스, 트렌드, 키워드, 콘텐츠 분석, 유튜브 기획, 유튜브 분석`,
      openGraph: {
        title: `${keyword} 관련 콘텐츠 분석 | 시청자 데이터 기반 콘텐츠 분석 두디스`,
        description: `${keyword}에 대한 분석 결과입니다. ${keyword} 관련 콘텐츠의 실시간 시청자 반응을 파악하고 알맞는 콘텐츠를 기획하세요.`,
      },
    };
  }
  return {};
}

const MainContentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedArticle =
    (searchParams?.snsTab as (typeof MEDIA_TABNAV_DATA)[number]['category']) ||
    'youtube';

  // const articleListData = await relatedContentApi[selectedArticle](
  //   '아시안게임',
  // );

  const selectedMainContent = searchParams?.main || 'recommend';

  const secondSection =
    (searchParams?.tab as (typeof CATEGORY_TABNAV_DATA)[number]['category']) ||
    'category';

  if (selectedMainContent === 'recommend') {
    return (
      <div className=" mx-auto w-[1342px] ">
        <Card>
          <CardHeader title="콘텐츠 소재">{/* <Chat /> */}</CardHeader>
          <div className="flex">
            <KeywordRankingList />

            <KeywordAnalyticsView />
          </div>
        </Card>
        <Card>
          <TabNavigation
            tabKey="tab"
            selectedArticle={secondSection}
            tabNavData={CATEGORY_TABNAV_DATA}
          />
          <MonthlyViewData currentTab={secondSection} />
        </Card>
        <Card>
          <TabNavigation
            tabKey="snsTab"
            selectedArticle={selectedArticle}
            tabNavData={MEDIA_TABNAV_DATA}
          />
          <MediaArticlesContainer selectedArticle={selectedArticle} />
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="mx-[3rem] mb-[30px]">
        <Container />
      </div>
    </>
  );
};

export default MainContentPage;
