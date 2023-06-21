import GNB from '@/layouts/MainLayout/GNB';
import NavSlider from '@/layouts/MainLayout/NavSlide';
import SideBar from '@/layouts/MainLayout/SideBar';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SideBar />
      <div className="ml-24">
        <GNB />
        <NavSlider />
        <>{children}</>
        <p style={{ fontSize: '10rem' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          quidem aspernatur ipsum aliquam optio eveniet sunt laboriosam
          inventore voluptatum assumenda nihil, accusantium adipisci magni dolor
          sapiente deleniti repellendus nam veniam!
        </p>
      </div>
    </>
  );
}

export default Layout;
