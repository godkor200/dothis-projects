import Content from '@/components/common/ContentCard/Content';
import ContentCard from '@/components/common/ContentCard/ContentCard';
import ContentCardHeader from '@/components/common/ContentCard/ContentCardHeader';
import ContentList from '@/components/common/ContentCard/ContentList';

const SocialMedia = () => {
  return (
    <ContentCard className="mb-[2.25rem]">
      <ContentCardHeader title="뉴스" />
      <div className="mt-10 flex gap-[1.25rem]">
        <Content />
        <ContentList />
      </div>
    </ContentCard>
  );
};

export default SocialMedia;
