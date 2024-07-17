const SystemError = () => {
  return (
    <div className="flex h-full flex-1 items-center justify-center pb-10 text-center text-[20px] font-bold">
      <h2>
        데이터를 불러오는 데 문제가 발생했습니다.
        <br />
        빠른 시일에 문제를 해결하도록 하겠습니다.
        <br />
        이용에 불편을 드려 죄송합니다.
      </h2>
    </div>
  );
};

export default SystemError;
