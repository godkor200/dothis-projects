const Layout = ({
  children,
  storyboard,
}: {
  children: React.ReactNode;
  storyboard: React.ReactNode;
}) => {
  return (
    <>
      <>{storyboard}</>

      <div className="pb-10 pt-[30px]">{children}</div>
    </>
  );
};

export default Layout;
