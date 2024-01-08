import Footer from '@/components/common/Layout/Footer';
import GNB from '@/components/common/Layout/GNB';
import SideBar from '@/components/common/Layout/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex ">
      <SideBar />
      {/* GNB infinity border */}
      <div className="border-grey400 z-index-1 absolute box-border h-[5.5rem] w-full border-b border-solid p-5" />

      {/* SideBar 영역 width 박스 */}
      <div className=" expandSideBar:w-[16.625rem]  w-[80px] flex-shrink-0" />

      <div className=" flex-1">
        <div className=" mx-auto  w-[1342px]">
          <GNB />
        </div>
        <>{children}</>
        {/* Footer infinity border */}
        <div className=" mx-auto  w-[1342px]">
          <div className="border-grey400 z-index-1 absolute left-0 box-border h-[1px] w-full border-b border-solid" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
