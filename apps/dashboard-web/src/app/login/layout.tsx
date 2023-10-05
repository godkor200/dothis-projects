const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-grey200 tablet:py-[15rem] desktop:py-[25rem] py-[10rem]">
      <section className="bg-grey00 tablet:p-10 mx-auto w-full max-w-[32rem] rounded-2xl px-6 py-4">
        {children}
      </section>
    </div>
  );
};
export default LoginLayout;
