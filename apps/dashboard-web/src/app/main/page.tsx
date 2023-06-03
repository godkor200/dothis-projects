import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

export default function Main() {
  return (
    <div className="template">
      <Sidebar />
      <Header />
      <div>여기에 내용이 들어갑니다</div>
      <div className="footer">footer</div>
    </div>
  );
}
