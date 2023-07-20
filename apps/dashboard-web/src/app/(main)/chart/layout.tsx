import NavSlider from '@/layouts/MainLayout/NavSlide';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavSlider />
      <>{children}</>
    </>
  );
};

export default Layout;
