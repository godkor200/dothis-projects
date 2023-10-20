import Footer from '@/layouts/MainLayout/Footer';
import GNB from '@/layouts/MainLayout/GNB';
import SideBar from '@/layouts/MainLayout/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="absolute w-full h-[5.5rem] p-5 border-b border-solid border-grey300 box-border z-index-1" />

      <div className="w-[1342px] mx-auto">
        <GNB />
        <>{children}</>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
