const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // 기존 main 레이아웃을 따라간다면 pt-[80px] 이 추가되어야함
    <div className=" flex  h-screen flex-col  items-center justify-center px-[171px] ">
      <h1 className="mb-[51px] whitespace-nowrap text-center text-[36px] font-bold">
        간편 로그인
      </h1>

      <div className="border-1 border-grey400 flex w-[1000px] flex-col items-center justify-center rounded-[120px] py-[70px]">
        {children}
      </div>
    </div>
  );
};
export default LoginLayout;
