import SvgComp from '@/share/SvgComp';

// Header 반응형 디자인이나 기획이 나오면 반응형 대응 예정
const GNB = () => {
  return (
    <header className="flex justify-center items-center relative w-full h-[5.5rem] p-5 border-b border-solid border-grey300 box-border">
      <div className="relative grow max-w-[27.5rem]">
        <input
          className="w-full border-2 border-solid border-grey300  rounded-8 py-3 pr-14 pl-4 box-border bg-grey00 outline-none transition focus:border-primary300 "
          placeholder="키워드를 넣어주세요"
        />
        <div className="absolute right-4 top-2/4 -translate-y-1/2">
          <SvgComp icon="HeaderPlus" size="2rem" />
        </div>
      </div>
      <div className="flex items-center ml-3 p-3 border border-solid border-primary100 rounded-8 bg-primary100">
        <SvgComp icon="HeaderEdit" size="1.5rem" />
      </div>

      {/* 이 부분은 Hover 디자인과 클릭 시 기능을 파악하고 추가 작업 */}
      <div className="flex gap-[0.25rem] absolute right-12 desktop:gap-[0.75rem]">
        <div className="p-3 rounded-8 hover:bg-grey300">
          <SvgComp icon="HeaderTicket" size="1.5rem" />
        </div>
        <div className="p-3 rounded-8 hover:bg-grey300">
          <SvgComp icon="HeaderNotification" size="1.5rem" />
        </div>
        <div className="p-3 rounded-8 hover:bg-grey300">
          <SvgComp icon="HeaderUserProfile" size="1.5rem" />
        </div>
      </div>
    </header>
  );
};
export default GNB;
