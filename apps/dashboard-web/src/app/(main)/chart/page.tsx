import ChartSidebar from '@/components/Chart/ChartSidebar/ChartSidebar';
import DashBoard from '@/components/Chart/DashBoard/DashBoard';
import ContentCard from '@/components/common/ContentCard/ContentCard';
import ContentCardHeader from '@/components/common/ContentCard/ContentCardHeader';

const ChartPage = () => {
  return (
    <ContentCard className="mb-[2.25rem]">
      <ContentCardHeader title="콘텐츠 소재" />
      <div className="flex">
        <ChartSidebar />
        <DashBoard />
      </div>
    </ContentCard>
  );
};

export default ChartPage;
