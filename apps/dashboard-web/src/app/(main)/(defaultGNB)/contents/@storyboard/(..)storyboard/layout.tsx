const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sticky top-0 z-[9999]  flex  w-full">
      <div className="absolute right-0 top-0  flex h-screen  w-[948px] bg-white shadow-[rgba(0,0,1,0.1)_-6px_0_5px_-1px]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
