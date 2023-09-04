import Footer from '@/layouts/MainLayout/Footer';
import GNB from '@/layouts/MainLayout/GNB';
import NavSlider from '@/layouts/MainLayout/NavSlide';
import SideBar from '@/layouts/MainLayout/SideBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SideBar />
      <div className="w-[1342px] mx-auto">
        <GNB />
        <>{children}</>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
