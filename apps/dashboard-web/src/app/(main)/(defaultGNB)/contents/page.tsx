import type { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';

import YoutubeArticlesContainer from '@/components/MainContents/MediaArticles/YoutubeArticlesContainer';
// import TabNavigation from '@/components/common/TabNavigation';
// import Card from '@/components/MainContents/Card';
// import CardHeader from '@/components/MainContents/CardHeader';
// import KeywordAnalyticsView from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
// import KeywordRankingList from '@/components/MainContents/InfoChartAndRanking/KeywordRankingList';
// import MediaArticlesContainer from '@/components/MainContents/MediaArticles/MediaArticlesContainer';
// import MonthlyViewData from '@/components/MainContents/MonthlyContentReport/MonthlyViewData';
// import Container from '@/components/MainOverallView/RelatedWordList/Container';
// import Chat from '@/components/OpenAI/Chat';
import { CATEGORY_TABNAV_DATA } from '@/constants/TabNav';
import { MEDIA_TABNAV_DATA } from '@/constants/TabNav';

const TabNavigation = dynamic(
  () => import('@/components/common/TabNavigation'),
  { ssr: false },
);
const Card = dynamic(() => import('@/components/MainContents/Card'), {
  ssr: false,
});
const CardHeader = dynamic(
  () => import('@/components/MainContents/CardHeader'),
  {
    ssr: false,
  },
);
const KeywordAnalyticsView = dynamic(
  () =>
    import(
      '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView'
    ),
  {
    ssr: false,
  },
);
const KeywordRankingList = dynamic(
  () =>
    import('@/components/MainContents/InfoChartAndRanking/KeywordRankingList'),
  {
    ssr: false,
  },
);
const MediaArticlesContainer = dynamic(
  () =>
    import('@/components/MainContents/MediaArticles/MediaArticlesContainer'),
  {
    ssr: false,
  },
);

const MonthlyViewData = dynamic(
  () =>
    import('@/components/MainContents/MonthlyContentReport/MonthlyViewData'),
  {
    ssr: false,
  },
);

const Container = dynamic(
  () => import('@/components/MainOverallView/RelatedWordList/Container'),
  {
    ssr: false,
  },
);

const Chat = dynamic(() => import('@/components/OpenAI/Chat'), {
  ssr: false,
});
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 요청이 따로 없어서 async 제거
export function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Metadata {
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

const MainContentPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedArticle =
    (searchParams?.snsTab as (typeof MEDIA_TABNAV_DATA)[number]['category']) ||
    'news';

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
          <CardHeader title="콘텐츠 소재" />
          <div className="flex">
            <KeywordRankingList />

            <KeywordAnalyticsView />
          </div>
          <Chat />
        </Card>
        <Card>
          <TabNavigation
            tabKey="tab"
            selectedArticle={secondSection}
            tabNavData={CATEGORY_TABNAV_DATA}
          />
          <MonthlyViewData currentTab={secondSection} />
        </Card>
        <div className="mx-[3rem] flex justify-between gap-[22px] [&>*]:flex-1">
          <Card withoutMargin>
            <TabNavigation
              tabKey="youtube"
              selectedArticle={'youtube'}
              tabNavData={[{ title: '유튜브', category: 'youtube' }]}
            />
            <YoutubeArticlesContainer />
          </Card>

          <Card withoutMargin>
            <TabNavigation
              tabKey="snsTab"
              selectedArticle={selectedArticle}
              tabNavData={MEDIA_TABNAV_DATA}
            />
            <MediaArticlesContainer selectedArticle={selectedArticle} />
          </Card>
        </div>
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
