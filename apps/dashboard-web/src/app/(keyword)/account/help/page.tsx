const Page = () => {
  return (
    <div className="flex  flex-col ">
      <h2 className="mb-[20px] text-[20px] font-bold">Q & A</h2>

      <div className=" grid grid-cols-[1fr,3fr]">
        {/* Header */}
        <div className="text-grey500 border-grey400 border-b py-[30px] text-[14px] font-bold">
          구분
        </div>
        <div className="text-grey500 border-grey400 border-b py-[30px] text-[14px] font-bold">
          제목
        </div>
        {/* Rows */}
        <div className="text-grey500 border-grey200 border-b-2 py-[30px] text-[14px] font-bold">
          결제
        </div>
        <div className="text-grey500 border-grey200 border-b-2 py-[30px] text-[14px] font-bold">
          플랜은 어디서 구매하나요?
        </div>
        <div className="text-grey500 border-grey200 border-b-2 py-[30px] text-[14px] font-bold">
          결제
        </div>
        <div className="text-grey500 border-grey200 border-b-2 py-[30px] text-[14px] font-bold">
          카드 등록은 어디서 하나요?
        </div>
      </div>
    </div>
  );
};

export default Page;
