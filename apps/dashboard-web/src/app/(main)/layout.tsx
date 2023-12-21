import Footer from '@/components/common/Layout/Footer';
import GNB from '@/components/common/Layout/GNB';
import SideBar from '@/components/common/Layout/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex">
      <SideBar />
      {/* GNB infinity border */}
      <div className="border-grey400 z-index-1 absolute box-border h-[5.5rem] w-full border-b border-solid p-5" />

      <div className="mx-auto  w-[1342px]">
        <div className="ml-[80px]">
          <GNB />
          <>{children}</>
          {/* Footer infinity border */}
          <div className="border-grey400 z-index-1 absolute left-0 box-border h-[1px] w-full border-b border-solid" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
