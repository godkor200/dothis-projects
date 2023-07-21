import Header from '@/components/Chart/Header/Header';
import NavSlider from '@/layouts/MainLayout/NavSlide';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavSlider />
      <Header />
      <>{children}</>
    </>
  );
};

export default Layout;
