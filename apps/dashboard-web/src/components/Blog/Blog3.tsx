import styles from './blog.module.css';

const Blog3 = () => {
  return (
    <li className={styles.container}>
      <h1>{'유튜브 스튜디오 데이터 뜯어보기 (1): 트래픽 소스 분석'}</h1>
      <p className={styles.date}>{'2023.07.27. 17:37'}</p>
      <div className={styles.contentDivision}>
        <p>
          안녕하세요! 영상 기획 어시스턴트 두디스입니다.
          <br />
          오늘은 유튜브 스튜디오 데이터를 분석해보는 첫 시간으로 트래픽 소스를
          분석하는 법에 대해 알려드리겠습니다.
        </p>
        <br />
        <h3>이 글을 읽으면 아래 내용을 이해할 수 있어요!</h3>
        <br />
        <p>1. 유튜브 스튜디오를 봐야하는 이유 </p>
        <p>2. 트래픽 소스 데이터 분석하는 법</p>
        <p>3. 데이터 분석에서 인사이트 얻는 법</p>
        <br />

        <h5>유튜브 스튜디오 얼마나 알고 계신가요?</h5>
        <br />
        <p>
          현재 유튜브 채널을 운영하고 계시거나 운영해본 적 있으신 분들은 다들
          유튜브 스튜디오를 한번 쯤 들어보거나 활용해 보셨을 거라 생각합니다.
          <br />
          유튜브 스튜디오는 내 채널 구독자 수, 영상 별 시청자 반응 등과 같은
          채널 성장의 핵심 지표를 한 눈에 파악하게 쉽게 제공합니다.
          <br />
          유튜브 스튜디오가 제공하는 데이터를 바탕으로 새로운 영상을 기획하거나
          채널 방향을 계획한다면 조금 더 빨리 채널 성장을 이끌어 낼 수 있습니다.
        </p>
        <br />
        <h5>시청자 유입 경로 분석의 시작, 트래픽 소스 데이터</h5>
        <br />
        <p>
          <br />
          오늘은 유튜브 스튜디오 데이터 뜯어보기 시리즈 중 첫 번째로 트래픽 소스
          데이터를 분석하는 방법을 소개하려고 합니다.
          <br />
          트래픽 소스란 시청자 유입 경로를 알려주는 데이터로써 영상의 조회수와
          직결되는 항목입니다.
          <br />
          채널 성장 핵심 지표이므로 반드시 트래픽 소스 데이터를 바탕으로 어느
          경로를 통해 더 많은 시청자를 끌어모을 수 있을지 분석해야 합니다.
          <br />
          <br />
          시청자 유입 경로는 유튜브 스튜디오의 트래픽 소스 분석에서 보실 수
          있습니다. 트래픽 소스 분석을 위해서는 먼저 유튜브 스튜디오의 분석 탭에
          들어가신 뒤 오른쪽 상단의 고급 모드를 클릭하시면 됩니다.
          <br />
          <br />
          <img src={'/images/blog/blog-3-1.png'} alt="3-1" />
          <br />
          <br />
          고급 모드를 클릭하면 다음과 같은 그래프 차트가 나타나는데 상단
          카테고리 창에서 트래픽 소스를 클릭하시면 내 채널의 영상 시청자가 어느
          채널을 통해 유입되고 있는 지 확인하실 수 있습니다.
          <br />
          상위 다섯 개에 해당하는 항목이 기본적으로 선택되어 있으며, 다른 항목도
          보고 싶다면 각 항목 앞에 있는 네모를 체크하면 됩니다.
          <br />
          <br />
          <img src={'/images/blog/blog-3-2.png'} alt="3-2" />
          <br />
          <br />
          각 항목에 대한 설명은 항목에 마우스를 가져다 대면 뜨는 물음표를
          클릭하면 보실 수 있습니다.
          <br />
          조금 더 쉬운 이해를 위해 설명을 덧붙이자면 다음과 같습니다.
          <br />
          <br />
          <ol>
            <li>
              Youtube 검색: 이용자가 유튜브 상단의 검색창에 원하는 정보나 단어를
              검색한 후 검색 결과에 해당하는 영상을 클릭하여 유입된 것을
              의미합니다. Youtube 검색 항목을 클릭하면 어떤 검색어로 내 채널에
              유입되었는지 알려줍니다.
            </li>
            <li>
              탐색기능: 홈 , 시청 기록, 맞춤 재생목록, 나중에 볼 동영상,
              구독정보의 항목으로 구성되어 있으며 대부분의 유입이 유튜브 홈
              화면에 노출된 영상을 통해 발생합니다.
            </li>
            <li>
              추천동영상: 이용자가 시청했던 영상과 관련된 주제나 소재를 유튜브
              알고리즘이 자동으로 추천하는데 이 과정으로 채널에 유입된 것을
              의미합니다.
            </li>
            <li>
              외부 : 유튜브가 아닌 외부 링크를 통해 유입된 것을 의미합니다. 구글
              검색이나 네이버 검색을 통해 유입되는 경우 외부 항목으로
              분류됩니다.
            </li>
            <li>
              재생목록: 시청자의 재생목록에 포함된 영상으로 유입된 것을
              의미합니다.
            </li>
          </ol>
          <br />각 항목에 대한 구체적인 분석과 채널 전략은 추후 유튜브 스튜디오
          데이터 뜯어보기 시리즈를 통해 더 자세하게 다룰 예정이니 계속
          기대해주세요!
        </p>
        <br />
        <h5>그렇다면 내 채널은 어떤 전략을 취해야 할까요? </h5>
        <br />
        <p>
          <b>그래프의 측정 항목 별 비교 분석 데이터</b>를 먼저 보겠습니다.
          <br />
          그래프의 Y축 값인 측정 항목 변경이 가능한데요. 좌측 상단에서 원하는
          측정 항목으로 선택할 수 있습니다.
          <br />
          많이 사용되는 지표인 조회수, 시청 시간, 평균 시청 지속 시간, 노출수,
          노출 클릭률을 기본적으로 선택할 수 있도록 제시하고 있으며 측정항목
          더보기란을 통해 카드 클릭수 등과 같이 특별하게 원하는 항목을
          추가적으로 선택할 수 있습니다.
          <br />
          <br />
          <img src={'/images/blog/blog-3-3.png'} alt="3-3" />
          <br />
          <br />
          <b>필터를 사용한 채널 분석</b>은 어떨까요?
          <br />
          좌측 상단의 필터를 보시면 더 상세한 항목을 추가한 시청자 유입 경로도
          확인 할 수 있습니다.
          <br />
          각 항목 별 데이터를 어떻게 해석하면 되는지 예시를 위해 구독 상태
          필터를 적용한 데이터를 분석해보겠습니다.
          <br />
          <br />
          <img src={'/images/blog/blog-3-4.png'} alt="3-4" />
          <br />
          <br />
          <img src={'/images/blog/blog-3-5.png'} alt="3-5" />
          <br />
          <br />
          <img src={'/images/blog/blog-3-6.png'} alt="3-6" />
          <br />
          <br />
          사진을 보면 이 채널은 구독을 하지 않은 사람의 조회수가 구독자의
          조회수보다 높은 것을 확인할 수 있습니다.
          <br />
          따라서 해당 채널은 채널 구독자 조회수보다는 유튜브 검색이나 탐색기능을
          통한 시청자 유입이 더 많다는 것을 유추해 볼 수 있죠.
          <br />
          <br />
          그렇다면 우리는 해당 데이터를 통해 어떤 판단을 내려볼 수 있을까요?
          <br />
          이 채널에서 영상 조회수 증가를 통해 채널 성장을 하겠다는 전략을 짠다면
          구독자 아닌 시청자 유입을 위해 유튜브 검색에 더 유리한 영상 제목을
          작성하고 탐색 기능을 통해 유튜브 홈 화면에 더 자주 노출 될 수 있도록
          비슷한 주제의 영상을 꾸준히 올리는 것이 채널 성장에 도움이 되는
          전략이란 판단을 내릴 수 있습니다.
          <br />
        </p>
      </div>
      <br />
      <br />
      <p>
        유튜브 영상 기획 서비스, 두디스(DOTHIS) 출시가 되었습니다! 지금 접속해서
        무료로 체험하세요.
        <br />
        <a href="https://dothis.kr/">https://dothis.kr/</a>
      </p>
    </li>
  );
};

export default Blog3;
