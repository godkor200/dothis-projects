import KeywordAnalyticsView from '@/components/MainContents/InfoChartAndRanking/KeywordAnalyticsView';
import KeywordRankingList from '@/components/MainContents/InfoChartAndRanking/KeywordRankingList';
import Card from '@/components/MainContents/Card';
import CardHeader from '@/components/MainContents/CardHeader';
import ContentCardHeaderTap from '@/components/MainContents/MediaArticles/MediaArticlesTabNav';
import MainContentContainer from '@/components/MainContents/MediaArticles/MediaArticlesContainer';
import relatedContentApi from '@/query/RelatedContent';
import MonthlyViewData from '@/components/MainContents/MonthlyContentReportSection/MonthlyViewData';

const MainContentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedArticle = (searchParams?.relatedContent as string) || 'news';
  const articleListData =
    await relatedContentApi[selectedArticle]('아시안게임');

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
        <CardHeader title="월간 View" />
        <MonthlyViewData />
      </Card>
      <Card>
        <ContentCardHeaderTap />
        <div className="mt-10 flex gap-[1.25rem]">
          <MainContentContainer articleListData={articleListData} />
        </div>
      </Card>
    </>
  );
};

export default MainContentPage;
