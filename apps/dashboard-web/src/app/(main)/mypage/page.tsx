import TabNavigation from '@/components/common/TabNavigation';
import MyPageContent from '@/components/mypage/MyPageContent';

export const MyPageTabNavData = [
  { title: '내 정보', category: 'info' },
  { title: '내 이용권 관리', category: 'manage' },
  { title: 'FAQ', category: 'faq' },
] as const;

const MyPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedMyPageType =
    (searchParams?.relatedContent as (typeof MyPageTabNavData)[number]['category']) ||
    'info';

  return (
    <div className="min-h-[calc(100vh-428px)] px-12 pt-20">
      <TabNavigation
        selectedArticle={selectedMyPageType}
        tabNavData={MyPageTabNavData}
      />
      <MyPageContent />
    </div>
  );
};

export default MyPage;
