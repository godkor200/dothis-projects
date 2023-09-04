import Header from '@/components/Chart/Header/Header';
import NavSlider from '@/layouts/MainLayout/NavSlide';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavSlider />
      <Header />
      <div className="bg-grey100 pt-[5rem]">{children}</div>
    </>
  );
};

export default Layout;
