import TabNavigation from '@/components/common/TabNavigation';
import MyPageContent from '@/components/MyPage/MyPageContent';
import { MYPAGE_TABNAV_DATA } from '@/constants/TabNav';

const MyPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedMyPageType =
    (searchParams?.relatedContent as (typeof MYPAGE_TABNAV_DATA)[number]['category']) ||
    'info';

  return (
    <div className="min-h-[calc(100vh-428px)] px-12 pt-20">
      <TabNavigation
        selectedArticle={selectedMyPageType}
        tabNavData={MYPAGE_TABNAV_DATA}
      />
      <MyPageContent />
    </div>
  );
};

export default MyPage;
