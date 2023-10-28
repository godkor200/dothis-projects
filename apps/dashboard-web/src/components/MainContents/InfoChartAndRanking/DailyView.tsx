interface DailyViewProps {
  view: number;
}

const DailyView = ({ view }: DailyViewProps) => {
  return (
    <div className="rounded-8 border-grey400 bg-grey00 mb-5 mt-10 flex h-fit justify-between border p-6 font-bold">
      <div className="text-grey600">일일 조회 수</div>
      <div>
        <span className="text-primary500">{view.toLocaleString('ko-KR')}</span>
        회
      </div>
    </div>
  );
};

export default DailyView;
