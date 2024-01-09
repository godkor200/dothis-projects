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
import relatedContentApi from '@/utils/api/mediaApis';

const MainContentPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedArticle =
    (searchParams?.snsTab as (typeof MEDIA_TABNAV_DATA)[number]['category']) ||
    'youtube';
  const articleListData = await relatedContentApi[selectedArticle](
    '아시안게임',
  );

  const selectedMainContent = searchParams?.main || 'recomand';

  const secondSection =
    (searchParams?.tab as (typeof CATEGORY_TABNAV_DATA)[number]['category']) ||
    'category';

  if (selectedMainContent === 'recomand') {
    return (
      <div className=" mx-auto w-[1342px] ">
        <Card>
          <CardHeader title="콘텐츠 소재" />
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
          <MediaArticlesContainer
            articleListData={articleListData}
            selectedArticle={selectedArticle}
          />
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
