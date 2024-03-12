const Layout = (props: {
  children: React.ReactNode;
  storyboard: React.ReactNode;
}) => {
  return (
    <div className="m-[30px]">
      현재 레이아웃
      <div className="flex flex-col gap-[20px]">
        <div>{props.children}</div>
        <div className="relative h-screen">
          <div className="border-primary400 absolute inset-y-0 right-0 w-[980px]  border shadow-2xl">
            {props.storyboard}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
