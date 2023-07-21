const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-grey200 py-[10rem] tablet:py-[15rem] desktop:py-[25rem]">
      <section className="w-full max-w-[32rem] mx-auto py-4 px-6 bg-grey00 rounded-2xl tablet:p-10">
        {children}
      </section>
    </div>
  );
};
export default LoginLayout;
