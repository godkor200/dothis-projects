import Footer from '@/layouts/MainLayout/Footer';
import GNB from '@/layouts/MainLayout/GNB';
import SideBar from '@/layouts/MainLayout/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="border-grey300 z-index-1 absolute box-border h-[5.5rem] w-full border-b border-solid p-5" />

      <div className="mx-auto w-[1342px]">
        <GNB />
        <>{children}</>
        <Footer />
      </div>
      {/* dlo */}
    </div>
  );
};

export default Layout;
