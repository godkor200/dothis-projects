import NavSlider from '@/layouts/MainLayout/NavSlide';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavSlider />
      <>{children}</>
    </>
  );
}

export default Layout;
