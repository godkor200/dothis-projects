import Mypage from '@/components/mypage';
import MyPageContent from '@/components/mypage/MyPageContent';
import type { ArticleType } from '@/components/mypage/MyPageTabNav';
import MyPageTabNav from '@/components/mypage/MyPageTabNav';

const MyPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedMyPageType =
    (searchParams?.relatedContent as ArticleType) || 'info';

  return (
    <div className="min-h-[calc(100vh-428px)] px-12 pt-20">
      <MyPageTabNav selectedArticle={selectedMyPageType} />
      <MyPageContent />
    </div>
  );
};

export default MyPage;
