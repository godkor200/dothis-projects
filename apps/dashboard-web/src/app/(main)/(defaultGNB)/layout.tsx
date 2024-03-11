import GNB from '@/components/common/Layout/GNB';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className=" ">
        <GNB />
      </div>
      <>{children}</>
    </>
  );
};

export default Layout;
