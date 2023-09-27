const LoginNewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" px-[171px] pt-[80px] ">
      <h1 className="mb-[51px] text-center text-[36px] font-bold">회원가입</h1>
      <div className="border-1 border-grey400 flex flex-col items-center justify-center rounded-[120px] py-[255px]">
        {children}
      </div>
    </div>
  );
};

export default LoginNewLayout;
