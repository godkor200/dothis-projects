import { VIEWCHART_LABEL } from './KeywordAnalyticsView';

type ViewChartLabel = '일일 조회수' | '기대 조회수';

interface CustomTooltip {
  keyword: string;
  label: ViewChartLabel;
  value: string | number;
  date: string;
}

const DailyViewGraphPoint = () => {
  return (
    <div className="border-primary500 h-2 w-2 rounded-full border-2 border-solid" />
  );
};

const ExpectedViewGraphPoint = () => {
  return (
    <div className="border-indigo h-2 w-2 rounded-full border-2 border-solid" />
  );
};

const CustomTooltip = ({ keyword, label, value, date }: CustomTooltip) => {
  return (
    <div className="bg-grey700 w-[192px] rounded p-2.5">
      <header className="border-grey600 flex items-center justify-between border-b border-solid pb-3">
        <h1 className="text-grey00 font-bold">{keyword}</h1>
        <span className="text-grey500 text-[12px]">{date}</span>
      </header>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          {label === VIEWCHART_LABEL.DAILYVIEW && <DailyViewGraphPoint />}
          {label === VIEWCHART_LABEL.EXPECTEDVIEW && <ExpectedViewGraphPoint />}
          <div className="text-grey00 ml-2 text-[14px] font-bold">{value}</div>
        </div>
        <span className="text-grey500 text-[12px]">{label}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
