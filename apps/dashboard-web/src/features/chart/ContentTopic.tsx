import RelatedWordAnalysis from '@/components/Chart/RelatedWordAnalysis/RelatedWordAnalysis';
import RelatedWordRanking from '@/components/Chart/RelatedWordRanking/RelatedWordRanking';
import ContentCard from '@/components/common/ContentCard/ContentCard';
import ContentCardHeader from '@/components/common/ContentCard/ContentCardHeader';

const ContentTopic = () => {
  return (
    <ContentCard className="mb-[2.25rem]">
      <ContentCardHeader title="콘텐츠 소재" />
      <div className="flex">
        <RelatedWordRanking />
        <RelatedWordAnalysis />
      </div>
    </ContentCard>
  );
};

export default ContentTopic;
