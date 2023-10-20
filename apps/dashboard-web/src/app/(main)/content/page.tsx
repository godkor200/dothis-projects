import Modal from '@/components/common/Modal/AuthModal/Modal';
import SignUpContents from '@/components/common/Modal/AuthModal/SignUpContents';
import ContentTopic from '@/features/chart/ContentTopic';
import SocialMedia from '@/features/chart/SocialMedia';

const ChartPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <>
      <ContentTopic />
      {/* @ts-expect-error Server Component */}
      <SocialMedia searchParams={searchParams} />
    </>
  );
};

export default ChartPage;
