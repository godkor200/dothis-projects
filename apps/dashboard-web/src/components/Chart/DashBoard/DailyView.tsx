interface DailyViewProps {
  view: number;
}

const DailyView = ({ view }: DailyViewProps) => {
  return (
    <div className="flex justify-between h-fit mt-10 min-w-[300px] p-6 font-bold rounded-8 border border-grey400 bg-grey00">
      <div className="text-grey600">일일 조회 수</div>
      <div>
        <span className="text-primary500">{view.toLocaleString('ko-KR')}</span>
        회
      </div>
    </div>
  );
};

export default DailyView;
