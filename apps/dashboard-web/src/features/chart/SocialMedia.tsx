import Content from '@/components/common/ContentCard/Content';
import ContentCard from '@/components/common/ContentCard/ContentCard';
import ContentCardHeaderTap from '@/components/common/ContentCard/ContentCardHeaderTap';
import ContentList from '@/components/common/ContentCard/ContentList';
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
        <Content
          title={contentArray[0].title}
          category={contentArray[0].category}
          provider={contentArray[0].provider}
          date={contentArray[0].date}
        />
        <ContentList contentArray={contentArray} />
      </div>
    </ContentCard>
  );
};

export default SocialMedia;
