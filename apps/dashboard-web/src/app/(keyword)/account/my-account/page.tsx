'use client';

const Page = () => {
  return (
    <div className="flex justify-center">
      <div className="bg-grey200 rounded-10 flex w-[600px] flex-col gap-[20px] p-10">
        <div>
          <p className="mb-[10px]">이메일</p>
          <p></p>
        </div>

        <div>
          <p>채널 정보</p>
        </div>

        <div>
          <p>알림</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
