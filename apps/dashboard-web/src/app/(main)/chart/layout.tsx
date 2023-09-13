import Header from '@/components/Chart/Header/Header';
import KeywordSlide from '@/components/Chart/Keyword/KeywordSlide';
import SearchBar from '@/components/Chart/SearchBar/Search';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <h2> 키워드로 인사이트를 얻어보세요</h2>
      <KeywordSlide />
      <SearchBar />
      <Header />
      <div className="bg-grey100 pt-[5rem]">{children}</div>
    </>
  );
};

export default Layout;
