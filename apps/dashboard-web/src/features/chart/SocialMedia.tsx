import Image from 'next/image';

import Content from '@/components/common/ContentCard/Content';
import ContentCard from '@/components/common/ContentCard/ContentCard';
import ContentCardHeaderTap from '@/components/common/ContentCard/ContentCardHeaderTap';
import ContentList from '@/components/common/ContentCard/ContentList';
import MainContentContainer from '@/components/common/ContentCard/MainContentContainer';
import relatedContentApi from '@/query/RelatedContent';

const SocialMedia = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const selectedRelatedContent =
    (searchParams?.relatedContent as string) || 'news';
  const contentArray = await relatedContentApi[selectedRelatedContent](
    '아시안게임',
  );

  return (
    <ContentCard className="mb-[2.25rem]">
      <ContentCardHeaderTap relatedContent={selectedRelatedContent} />
      <div className="mt-10 flex gap-[1.25rem]">
        <MainContentContainer contentArray={contentArray} />
      </div>
    </ContentCard>
  );
};

export default SocialMedia;
