import TabNavigation from '@/components/common/TabNavigation';
import Card from '@/components/MainContents/Card';
import CardHeader from '@/components/MainContents/CardHeader';
import KeywordAnalyticsView from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import KeywordRankingList from '@/components/MainContents/InfoChartAndRanking/KeywordRankingList';
import MainContentContainer from '@/components/MainContents/MediaArticles/MediaArticlesContainer';
import MonthlyViewData from '@/components/MainContents/MonthlyContentReport/MonthlyViewData';
import relatedContentApi from '@/utils/api/mediaApis';

export const MediaTabNavData = [
  { title: '유튜브', category: 'youtube' },
  // { title: '커뮤니티', category: 'community' },
  // { title: 'SNS', category: 'SNS' },
  { title: '뉴스', category: 'news' },
] as const;

export type MedialTabNavDataCategoryType =
  (typeof MediaTabNavData)[number]['category'];

const MainContentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedArticle =
    (searchParams?.tab as (typeof MediaTabNavData)[number]['category']) ||
    'news';
  const articleListData = await relatedContentApi[selectedArticle](
    '아시안게임',
  );

  console.log(searchParams);

  return (
    <>
      <Card>
        <CardHeader title="콘텐츠 소재" />
        <div className="flex">
          <KeywordRankingList />
          <KeywordAnalyticsView />
        </div>
      </Card>
      <Card>
        <CardHeader title="월간 콘텐츠 리포트" />
        <MonthlyViewData />
      </Card>
      <Card>
        <TabNavigation
          selectedArticle={selectedArticle}
          tabNavData={MediaTabNavData}
        />
        <MainContentContainer
          articleListData={articleListData}
          selectedArticle={selectedArticle}
        />
      </Card>
    </>
  );
};

export default MainContentPage;
