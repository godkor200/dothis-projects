import Footer from '@/layouts/MainLayout/Footer';
import GNB from '@/layouts/MainLayout/GNB';
import SideBar from '@/layouts/MainLayout/SideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBar />
      <div className="ml-24">
        {
          //       <GNB />
        }
        <>{children}</>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
