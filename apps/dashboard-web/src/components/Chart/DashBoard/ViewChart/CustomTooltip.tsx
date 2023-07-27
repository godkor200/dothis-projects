import { VIEWCHART_LABEL } from '../DashBoard';

type ViewChartLabel = '일일 조회수' | '기대 조회수';

interface CustomTooltip {
  keyword: string;
  label: ViewChartLabel;
  value: string | number;
  date: string;
}

const DailyViewGraphPoint = () => {
  return (
    <div className="w-2 h-2 rounded-full border-2 border-solid border-primary500" />
  );
};

const ExpectedViewGraphPoint = () => {
  return (
    <div className="w-2 h-2 rounded-full border-2 border-solid border-indigo" />
  );
};

const CustomTooltip = ({ keyword, label, value, date }: CustomTooltip) => {
  return (
    <div className="w-[192px] bg-grey700 p-2.5 rounded">
      <header className="flex justify-between items-center pb-3 border-b border-solid border-grey600">
        <h1 className="text-grey00 font-bold">{keyword}</h1>
        <span className="text-grey500 text-[12px]">{date}</span>
      </header>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center">
          {label === VIEWCHART_LABEL.DAILYVIEW && <DailyViewGraphPoint />}
          {label === VIEWCHART_LABEL.EXPECTEDVIEW && <ExpectedViewGraphPoint />}
          <div className="ml-2 text-grey00 font-bold text-[14px]">{value}</div>
        </div>
        <span className="text-grey500 text-[12px]">{label}</span>
      </div>
    </div>
  );
};

export default CustomTooltip;
