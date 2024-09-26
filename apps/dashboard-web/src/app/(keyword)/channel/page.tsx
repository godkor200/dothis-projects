// channel에 대한 페이지는 다른 사람의 채널에 대한 데이터를 볼 수 있는 구조가 아니다 보니깐,  dynamic Route 구조로 굳이할 필요가 없다고 생각함
const Page = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-[48px] font-bold">
      <h2 className="text-grey500 border-grey500 mb-[1rem] flex h-20  w-20 items-center justify-center rounded-full border-4 text-[48px] font-bold">
        !
      </h2>
      준비 중인 서비스입니다.
    </div>
  );
};

export default Page;
