const ApiErrorComponent = ({ refetch }: { refetch: () => void }) => {
  return (
    <div className="flex flex-1  flex-grow flex-col items-center justify-center gap-[20px]">
      <h2 className="text-grey900 text-center text-[20px] font-bold">
        데이터를 불러오는 데 실패했습니다. <br /> 다시 시도해주시기 바랍니다.
      </h2>

      <button
        className="border-primary500 text-primary500 rounded-[4px] border px-[20px] py-2 text-[12px] font-[500] focus:outline-none"
        onClick={refetch}
      >
        새로 고침
      </button>
    </div>
  );
};

export default ApiErrorComponent;
