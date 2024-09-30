const AnalysisChannelList = () => {
  return (
    <div className="custom-scroll-box h-[360px] overflow-y-scroll px-[20px]">
      {Array.from({ length: 0 }).map((item, index) => (
        <div
          className="text-grey600 grid  grid-cols-[40px,3fr,2fr] items-center gap-x-[20px] truncate p-[10px] text-[14px] font-[500]"
          key={index}
        >
          <div className="bg-primary300 h-10 w-10 rounded-full"></div>
          <div>곽튜브</div>
          <div>200만 명</div>
        </div>
      ))}

      <p className="text-grey600 py-[20px] pl-16 text-[14px] font-[500]">
        분석 채널을 등록하세요.
      </p>
    </div>
  );
};

export default AnalysisChannelList;
