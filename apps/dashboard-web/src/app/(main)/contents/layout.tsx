const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2 className="text-h3 pb-10 pt-20 text-center font-bold">
        키워드로 인사이트를 얻어보세요
      </h2>

      <>{children}</>
    </>
  );
};

export default Layout;
