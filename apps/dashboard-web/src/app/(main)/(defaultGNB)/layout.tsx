import GNB from '@/components/common/Layout/GNB';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="mx-auto  max-w-[1342px]">
        <GNB />
      </div>
      <>{children}</>
    </>
  );
};

export default Layout;
