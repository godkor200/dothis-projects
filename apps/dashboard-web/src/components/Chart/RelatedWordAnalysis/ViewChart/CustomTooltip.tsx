import { VIEWCHART_LABEL } from '../RelatedWordAnalysis';

type ViewChartLabel = '일일 조회수' | '기대 조회수';

interface CustomTooltip {
  keyword: string;
  label: ViewChartLabel;
  value: string | number;
  date: string;
}

const DailyViewGraphPoint = () => {
  return (
    <div className="h-2 w-2 rounded-full border-2 border-solid border-primary500" />
  );
};

const ExpectedViewGraphPoint = () => {
  return (
    <div className="h-2 w-2 rounded-full border-2 border-solid border-indigo" />
  );
};

const CustomTooltip = ({ keyword, label, value, date }: CustomTooltip) => {
  return (
    <div className="w-[192px] rounded bg-grey700 p-2.5">
      <header className="flex items-center justify-between border-b border-solid border-grey600 pb-3">
        <h1 className="font-bold text-grey00">{keyword}</h1>
        <span className="text-[12px] text-grey500">{date}</span>
      </header>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center">
          {label === VIEWCHART_LABEL.DAILYVIEW && <DailyViewGraphPoint />}
          {label === VIEWCHART_LABEL.EXPECTEDVIEW && <ExpectedViewGraphPoint />}
          <div className="ml-2 text-[14px] font-bold text-grey00">{value}</div>
        </div>
        <span className="text-[12px] text-grey500">{label}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
