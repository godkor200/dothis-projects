import { MONTHLY_VIEW_DUMMY_DATA } from '@/mocks/monthlyReport/monthlyViewDummyData';
import SvgComp from '@/share/SvgComp';
import SummaryItem from '../AnalysisWidgetItem';
import ContentCard from '../Card';

const MonthlyViewData = () => {
  return (
    <ContentCard>
      <h3 className="typo-t2 mt-10  flex items-center gap-[4px]">
        월간 View
        <SvgComp icon="Question" size={18} />
      </h3>
      <ul className="mt-5 flex gap-[20px]">
        {MONTHLY_VIEW_DUMMY_DATA.map(({ title, content }) => (
          <SummaryItem key={title} title={title} content={content} />
        ))}
      </ul>
    </ContentCard>
  );
};

export default MonthlyViewData;
