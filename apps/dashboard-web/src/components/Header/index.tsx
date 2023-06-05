import './style.css';

export default function Header() {
  return (
    <div className="header">
      <div />
      <div className="searchBarContainer">
        <input
          className="searchBar"
          placeholder="분석하고 싶은 키워드를 추가해 보세요"
        />
        <button className="searchBarButton plus">+</button>
        <button className="searchBarButton enter">0</button>
      </div>
      <div className="ButtonsContainer">
        <button className="searchBarButton">1</button>
        <button className="searchBarButton">2</button>
        <button className="searchBarButton grey">3</button>
      </div>
    </div>
  );
}
