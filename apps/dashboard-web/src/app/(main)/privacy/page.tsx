import Link from 'next/link';
import styles from '../normalize.module.css';

const PrivacyPage = () => {
  return (
    <div className={styles.container}>
      <h1>두디스 개인정보 처리방침</h1>
      <ul>
        <li>시행일 : 2023년 11월 16일</li>
      </ul>
      <p>
        두디스는 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법,
        통신비밀보호법, 전기통신사업법 등 정보통신서비스제공자가 준수하여야 할
        관련 법령상의 개인정보보호 규정을 준수하며, 관련 법령에 의거한
        개인정보처리방침을 정하여 회원 권익 보호에 최선을 다하고 있습니다.
      </p>
      <p>
        두디스는 본 개인정보처리방침을 통하여 회원님이 제공하시는 개인정보가
        어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가
        취해지고 있는지 알려드립니다.
      </p>
      <br />
      <h3 id="-1-">제 1조 개인정보 수집 목적</h3>
      <ul>
        <li>서비스 제공 및 향상</li>
        <ul>
          <li>서비스 제공 및 향상을 위한 목적으로 정보 사용</li>
          <li>서비스 이용에 관한 커뮤니케이션 및 문의 응답</li>
        </ul>
        <li>컨텐츠 및 정보 개인화</li>
        <ul>
          <li>사용자에게 보낼 컨텐츠 및 정보의 맞춤화</li>
          <li>사용자 경험의 개인화를 위한 도움 및 안내 제공</li>
        </ul>
        <li>마케팅</li>
        <ul>
          <li>뉴스 및 뉴스레터, 특별 제안 및 프로모션 제공</li>
          <li>사용자 관심 추정 제품 또는 정보에 관한 연락</li>
        </ul>
        <li>연구 및 분석</li>
        <ul>
          <li>서비스 상호작용 분석</li>
          <li>집계 및 개별 기준의 연구, 분석 및 통계 목적</li>
        </ul>
        <li>권리 및 이익 보호</li>
        <ul>
          <li>
            서비스 및 사용자의 안전, 권리, 재산 또는 보안을 보호하기 위한 목적
          </li>
          <li>사기, 보안 또는 기술 문제 감지, 예방 또는 해결</li>
          <li>
            두디스의 재량으로 불법, 비윤리적 또는 법적으로 제재 될 수 있는 활동
            또는 위험이 될 수 있는 활동의 조사에 사용
          </li>
          <li>소송의 증거로 사용하거나 정책이나 이용 약관 집행</li>
        </ul>
        <li>법적 준수</li>
        <ul>
          <li>관련 법률이나 규정을 준수하기 위한 목적으로 정보 사용</li>
          <li>사법 절차, 소환, 영장, 또는 기타 법적 절차에 대한 응답</li>
        </ul>
      </ul>
      <br />
      <h3 id="-2-">제 2조 개인정보 수집 항목</h3>
      <ul>
        <li>일부 서비스를 이용하기 위해 필수로 제공되어야 하는 정보</li>
        <ul>
          <li>
            소셜로그인 플랫폼의 이메일, 닉네임, 회원 인증 키, 이름 등 로그인
            식별 정보, Youtube 채널 세부 정보
          </li>
        </ul>
        <li>쿠키, 또는 기타 추적 기술을 통해 자동으로 수집하는 정보</li>
        <ul>
          <li>
            도메인 이름, 접속 기기 식별자, 브라우저 유형 및 운영 체제, 웹 페이지
            접속 경로, 클릭한 링크, 버튼 또는 기타 요소, IP 주소, 사이트 및
            서비스 사용 기간, 참조 URL 및 사이트로 연결된 웹 페이지
          </li>
        </ul>
        <li>Youtube 채널에 대한 정보 수집</li>
        <ul>
          <li>
            두디스는 Google API에서 받은 정보를 사용하고 다른 앱으로 전송하는
            것은 제한된 사용 요구 사항을 포함하여{' '}
            <Link href={'/privacy'}>
              <span className="font-bold">
                Google API 서비스 사용자 데이터 정책
              </span>
            </Link>
            을 준수합니다.
          </li>
        </ul>
        <li>선택 항목</li>
        <ul>
          <li>프로필 이미지, 연락처, PUSH 알림 및 마케팅 수신 동의 여부</li>
        </ul>
      </ul>
      <br />
      <h3 id="-3-">제 3조 개인정보 수집 방법</h3>
      <ul>
        <li>홈페이지, 설문조사, 고객 문의, 오픈인증 서비스</li>
        <li>쿠키, 로그 분석 프로그램을 통한 생성 정보</li>
      </ul>
      <br />
      <h3 id="-4-">제 4조 개인정보 수집에 대한 동의</h3>
      <p>
        두디스는 적법하고 공정한 수단에 의하여 서비스 계약의 성립 및 이행에
        필요한 최소한의 개인정보를 수집합니다. 두디스가 회원의 개인 식별이
        가능한 개인정보를 수집하는 때는 반드시 아래의 적법한 절차에 따라 회원의
        동의를 받습니다. 회원의 개인정보 수집과 관련하여 두디스의 이용약관 또는
        개인정보처리방침을 통해 그 내용을 고지하고 있으며, 회원이 위 내용에 대해
        &#39;동의&#39; 버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로
        봅니다. 두디스는 서버 로그파일이나 조사를 기반으로 회원들의 분포도,
        관심사 그리고 행동양식을 연구합니다. 이는 회원들을 보다 잘 이해하고 보다
        높은 질의 서비스를 제공하기 위한 것입니다. 이러한 연구는 총체적으로
        수집, 분석되며 회원 개인에 관하여 식별할 수 있는 정보를 포함되어 있지
        않습니다.
      </p>
      <br />
      <h3 id="-5-">제 5조 개인정보의 보유 기간 및 파기절차와 방법</h3>
      <p>
        두디스는 개인정보의 수집 목적 또는 제공받은 목적이 달성된 때에는 회원의
        개인정보를 지체 없이 폐기합니다.
      </p>
      <p>1항. 파기 대상</p>
      <ol>
        <li>회원가입 정보의 경우 : 회원가입을 탈퇴하거나 회원에서 제명된 때</li>
        <li>
          설문조사, 이벤트 등의 목적을 위하여 회원가입정보에 포함된 주소와 다른
          별도의 배송지 정보를 수집한 경우 : 해당 이용 목적이 종료된 때. (단,
          수집 목적 또는 제공받은 목적이 달성된 경우에도 상법 등 법령의 규정에
          의하여 보존할 필요성이 있는 경우에는 예외적으로 회원의 개인정보를
          보유할 수 있습니다.)
        </li>
        <li>
          상법 및 ’전자상거래 등에서 소비자보호에 관한 법률’ 등 관련 법령의
          규정에 의하여 보존할 필요성이 있는 경우 다음 기간이 경과된 때
          <ul>
            <li>계약 또는 청약 철회 등에 관한 기록 : 5년</li>
            <li>대금결제 및 재화 등의 공급에 관한 기록 : 5년</li>
            <li>소비자의 불만 또는 분쟁처리에 관한 기록 : 3년</li>
          </ul>
        </li>
        <li>
          정당한 절차에 따라 보유 기간을 미리 회원에게 고지하거나 명시한 경우
          해당 보유기간이 경과된 때
        </li>
        <li>개별적으로 회원의 동의를 받은 경우 : 동의 받은 기간이 경과된 때</li>
        <li>
          고객상담 및 회원의 추가적인 피해 방지를 위해 30일간 보관하는 경우 해당
          기간이 경과된 때
        </li>
      </ol>
      <p>2항. 파기 방법</p>
      <ol>
        <li>
          전자적 파일 형태로 저장된 개인정보 : 기록을 재생할 수 없는 기술적
          방법으로 삭제
        </li>
        <li>종이 인쇄된 개인정보 : 분쇄기로 분쇄</li>
      </ol>
      <br />
      <h3 id="-6-">제 6조 이용자의 권리와 행사 방법</h3>
      <p>1항. 개인정보 연람 및 정정 방법</p>
      <ul>
        <li>
          회원은 언제든지 등록되어 있는 회원의 개인정보를 열람하거나 정정할 수
          있습니다. 회원의 개인정보에 대한 열람 또는 정정을 하고자 할 경우에는 [
          환경설정 ] 메뉴를 클릭하여 직접 열람 또는 정정하거나, 개인정보 관련
          담당자에게 전화 또는 전자우편으로 연락하면 지체 없이 정정할 수
          있습니다. 만일 회원의 대리인이 방문하여 열람 또는 정정을 요구하는
          경우에는 회원의 진정한 대리인인지 여부를 확인하기 위해, 대리관계를
          나타내는 증표를 제시하도록 요구할 수 있습니다.
        </li>
        <li>
          회원이 개인정보의 오류에 대한 정정을 요청한 경우에는 정정을 완료하기
          전까지 당해 개인정보를 이용 또는 제공하지 않습니다. 또한 잘못된
          개인정보를 제 3자에게 이미 제공한 경우에는 정정 처리 결과를 제 3
          자에게 지체 없이 통지하여 정정이 이루어지도록 조치합니다. 다만,
          개인정보의 전부 또는 일부에 대하여 열람 또는 정정을 거절할 정당한
          이유가 있는 경우에는 회원에게 이를 지체 없이 통지하고 그 이유를
          설명합니다.
        </li>
        <li>
          단, 다음과 같은 경우에는 예외적으로 개인정보의 열람 및 정정을 제한할
          수 있습니다.
          <ul>
            <li>
              본인 또는 제 3 자의 생명, 신체, 재산 또는 권익을 현저하게 해할
              우려가 있는 경우
            </li>
            <li>
              당해 서비스 제공자의 업무에 현저한 지장을 미칠 우려가 있는 경우
            </li>
            <li>법령에 위반하는 경우</li>
          </ul>
        </li>
      </ul>
      <p>2항. 동의 철회 및 회원 탈퇴 방법</p>
      <ul>
        <li>
          회원은 회원가입 시 개인정보의 수집, 이용 및 제공에 대해 동의한 내용을
          언제든지 철회할 수 있습니다. 동의철회 및 회원탈퇴를 원하실 경우에는
          회원 본인이 사이트 상에서 또는 전화나, 전자우편을 통해 회원 탈퇴를
          회사에 신청해야 합니다.
        </li>
      </ul>
      <br />
      <h3 id="-7-">제 7조 개인정보의 안전성 확보 조치</h3>
      <p>
        두디스는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한
        기술적/관리적 및 물리적 조치를 하고 있습니다.
      </p>
      <ul>
        <li>
          정기적인 자체 감사 실시
          <ul>
            <li>
              개인정보 취급 관련 안정성 확보를 위해 정기적(분기 1회)으로 자체
              감사를 실시하고 있습니다.
            </li>
          </ul>
        </li>
        <li>
          개인정보 취급 직원의 최소화 및 교육
          <ul>
            <li>
              개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여
              개인정보를 관리하는 대책을 시행하고 있습니다.
            </li>
          </ul>
        </li>
        <li>
          내부관리계획의 수립 및 시행
          <ul>
            <li>
              개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고
              있습니다.
            </li>
          </ul>
        </li>
        <li>
          해킹 등에 대비한 기술적 대책
          <ul>
            <li>
              두디스는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및
              훼손을 막기 위하여 보안프로그램을 설치하고 주기적인 갱신·점검을
              하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고
              기술적/물리적으로 감시 및 차단하고 있습니다.
            </li>
          </ul>
        </li>
        <li>
          개인정보의 암호화
          <ul>
            <li>
              이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어,
              본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화
              하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고
              있습니다.
            </li>
          </ul>
        </li>
        <li>
          접속기록의 보관 및 위변조 방지
          <ul>
            <li>
              개인정보처리 시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고
              있으며, 접속 기록이 위변조 및 도난, 분실되지 않도록 보안기능
              사용하고 있습니다.
            </li>
          </ul>
        </li>
        <li>
          개인정보에 대한 접근 제한
          <ul>
            <li>
              개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의
              부여,변경,말소를 통하여 개인정보에 대한 접근통제를 위하여 필요한
              조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단
              접근을 통제하고 있습니다.
            </li>
          </ul>
        </li>
        <li>
          문서보안을 위한 잠금장치 사용
          <ul>
            <li>
              개인정보가 포함된 서류, 보조저장매체 등을 잠금장치가 있는 안전한
              장소에 보관하고 있습니다.
            </li>
          </ul>
        </li>
        <li>
          비인가자에 대한 출입 통제
          <ul>
            <li>
              개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해
              출입통제 절차를 수립, 운영하고 있습니다.
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <h3 id="-8-">제 8조 개인정보 공유 및 제공</h3>
      <p>
        두디스는 이용자의 경험 개선을 위해 제3자들과 협업하지만, 두디스가 소유
        또는 관리하지 않는 사업체에게는 본 정책이 적용되지 않습니다. 두디스는 제
        3자가 두디스와 동일한 정책을 적용하는지 여부에 대해 보장할 수 없습니다.
        따라서, 제 3자에게 정보를 제공하기에 앞서 제 3자의 정책 및 조건을 자세히
        읽어주시기 바랍니다.
      </p>
      <p>
        이용자가 접근하는 제3자 웹사이트 또는 서비스와 관련하여 이용자의 정보가
        공유되는 방식에는 다음이 포함됩니다.
      </p>
      <ul>
        <li>
          내부 저장
          <ul>
            <li>
              두디스에서는 보다 나은 AI 서비스를 제공하기 위해 이용자의
              개인정보를 자사 데이터베이스에 저장합니다.
            </li>
            <li>
              저장하는 개인정보 항목 : 이용자의 Youtube 채널명, 구독자 수,
              동영상 수 등 채널의 메타데이터와 재생목록, 업로드한 동영상들의
              제목, 설명, 조회수, 등록일 등 영상의 메타데이터
            </li>
            <li>
              이용자는 개인정보 수집을 원치 않을 경우, 언제든지 Google 계정에서
              액세스 권한을 삭제할 수 있습니다.
            </li>
          </ul>
        </li>
        <li>
          외부링크
          <ul>
            <li>
              이용자가 제3자가 운영하는 외부 웹사이트 또는 서비스로 연결되는
              링크를 클릭하는 경우, 제 3자는 두디스가 아닌 해당 제3자의 정책에
              따라 이용자의 개인정보를 수집, 이용 및 제공할 수 있습니다. 또한
              제3자 서비스의 링크가 포함된다고 하여 두디스가 해당 제3자의 서비스
              또는 정책을 보증하는 것은 아닙니다.
            </li>
          </ul>
        </li>
        <li>
          결제 처리
          <ul>
            <li>
              이용자가 선택한 결제방식 및 지역에 따라, 이용자가 제공하는 결제
              관련 정보가 제3자로부터 직접 수집되어 해당 제3자의 개인정보
              처리방침의 적용을 받을 수 있습니다. 예를 들어, 이용자는 신용카드를
              이용하여 구매하기 위해서는 해당 신용카드사에게 직접 결제 정보를
              제공해야 하며 해당 신용카드사를 이용하는 이용자의 정보는 해당
              신용카드사의 개인정보 처리방침의 적용을 받습니다.
            </li>
          </ul>
        </li>
        <li>
          계정 연동
          <ul>
            <li>
              두디스는 이용자의 두디스 계정 또는 해당 제3자 서비스의 계정, 또는
              이를 통하는 등의 방법으로 제3자의 웹사이트, 애플리케이션 또는 유사
              서비스와 교류할 수 있는 인터페이스를 이용합니다. 예를 들면, 당사는
              원활한 사용자 맞춤형 분석 서비스를 제공하기 위해 Google 및 Youtube
              계정 연동을 사용하고 있습니다. 이러한 기능은 이용자와 소셜미디어,
              이용자와 두디스 간 교류에 관한 정보를 수집할 수 있으며, 기능이
              적절히 작동하게 하기 위해 쿠키와 같은 추적 기술을 이용할 수
              있습니다. Google 및 Youtube와 같은 제3자 서비스 제공업체가
              이용자로부터 직접 수집한 개인정보를 처리하는 방식은 해당 업체의
              개인정보 처리방침에 따릅니다.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        두디스는 개인정보를 포함한 귀하의 정보를 다음과 같이 공유할 수 있습니다.
      </p>
      <ul>
        <li>
          자사 서비스
          <ul>
            <li>
              당사는 귀하로부터 수집한 정보를 자사 데이터베이스에 저장 및 공유할
              수 있습니다. 그러나 이 경우, 귀하의 정보를 가공하지 않으며, 개인
              식별 정보의 사용 및 공개하지 않습니다.
            </li>
          </ul>
        </li>
        <li>
          파트너
          <ul>
            <li>
              당사는 귀하로부터 수집한 정보를 Google, Youtube, Twitter, Meta과
              같이 당사를 대신하여 기능을 수행하는 서드파티 공급업체, 서비스
              제공업체, 계약자 또는 대리인에게 공개할 수 있습니다.
            </li>
          </ul>
        </li>
      </ul>
      <p>두디스는 다음과 같은 상황에서 정보를 공개합니다.</p>
      <ul>
        <li>
          사업 양도
          <ul>
            <li>
              당사가 다른 회사에 의해 인수되거나 합병될 경우 또는 당사의 자산이
              다른 회사로 이전되거나 파산 또는 파산 절차의 일부로 진행되는
              경우에 귀하로부터 수집한 정보를 다른 회사로 이전할 수 있습니다.
            </li>
          </ul>
        </li>
        <li>
          법적 절차에 대한 대응
          <ul>
            <li>
              당사는 법률, 사법 절차, 법원 명령 또는 소환장에 대한 대응과 같은
              기타 법적 절차를 준수하기 위해 귀하로부터 수집한 정보를 공개할 수
              있습니다.
            </li>
          </ul>
        </li>
        <li>
          타인 보호 목적
          <ul>
            <li>
              당사는 불법 활동, 사기 의심, 개인의 안전에 대한 잠재적인 위협과
              관련된 상황, 이용 약관 위반 등에 대해 조사, 예방 또는 조치가
              필요하다고 판단되는 경우 귀하로부터 수집한 정보를 공개할 수
              있습니다. 본 정책 또는 당사가 관련된 소송의 증거로 사용됩니다.
            </li>
          </ul>
        </li>
        <li>
          집계 및 식별되지 않은 정보
          <ul>
            <li>
              당사는 마케팅, 광고, 연구 또는 이와 유사한 목적을 위해 사용자에
              대한 집계 정보 또는 식별 정보가 제거된 정보를 제3자와 공유할 수
              있습니다.
            </li>
          </ul>
        </li>
      </ul>
      <br />
      <h3 id="-9-">
        제 9조 개인정보 자동 수집 장치의 설치, 운영 및 거부에 관한 사항
      </h3>
      <p>
        회사는 회원의 정보를 수시로 저장하고 찾아내는 쿠키(cookie) 등 개인
        정보를 자동으로 수집하는 장치 혹은 기술을 설치/운용합니다. 쿠키란 회사의
        웹사이트를 운영하는데 이용되는 서버가 회원의 웹 브라우저에 보내는 작은
        텍스트로, 회원의 컴퓨터 저장 장치에 저장됩니다.
      </p>
      <p>회사는 쿠키 등을 다음과 같은 목적을 위해 사용합니다.</p>
      <ul>
        <li>회사가 제공하는 상품 구매 시 인증</li>
        <li>이용자의 관심 분야에 따라 차별화된 정보 제공</li>
        <li>유료 서비스 이용 시 이용 기간 안내</li>
        <li>이용자의 이용패턴 분석을 통한 서비스 개편의 척도로 활용</li>
        <li>서비스 이용 및 게시판 글 등록</li>
        <li>이벤트 및 설문조사 시 참여 내역 등 활동 내역 확인</li>
      </ul>
      <p>
        회원님은 쿠키 설치 및 이용 권한에 대한 선택권을 가지고 있으며, 직접 사용
        중인 웹 브라우저에서 옵션을 설정함으로써 웹 브라우저가 지원하는 설정에
        따라 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든
        쿠키의 저장을 거부할 수 있습니다. 단, 회원님께서 쿠키 설치를 거부하였을
        경우 로그인이 필요한 서비스는 이용할 수 없습니다.
      </p>
      <p>쿠키 설정 거부 방법 (Google Chrome 이용 시)</p>
      <ul>
        <li>
          우측 상단 추가메뉴 &gt; 설정 &gt; 고급 &gt; 사이트 설정 &gt; 쿠키 &gt;
          원하는 방식에 따라 전체 허용/차단 혹은 도메인 설정
        </li>
      </ul>

      <br />
      <h3 id="-10-">제 10조 개인정보 보호책임자</h3>
      <p>
        두디스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
        관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보
        보호책임자를 지정하고 있습니다.
      </p>
      <p>
        정보주체께서는 두디스의 서비스를 이용하시면서 발생한 모든 개인정보 보호
        관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및
        담당자로 문의하실 수 있습니다. 블링 은 정보주체의 문의에 대해 지체 없이
        답변 및 처리해드릴 것입니다.
      </p>
      <details>
        <summary> 개인정보 보호책임자</summary>
        <p>
          <strong>성명 :</strong> 민상현
        </p>
        <p>
          <strong>이메일주소 :</strong> contact@dothis.kr
        </p>
      </details>
      <br />
      <h3 id="-11-">제 11조 정책 변경에 따른 공지 의무</h3>
      <p>
        본 개인정보 보호정책은 관련 법률 및 정부 지침의 변경과 두디스 내부 정책
        변경에 의하여 수시로 변경될 수 있습니다. 두디스의 개인정보 보호정책이
        변경될 경우에는 운영하는 사이트 화면에 게시하거나 기타의 방법으로
        회원에게 공지합니다. 변경 관련 문의 사항은 개인정보 관리 책임자 및
        담당자에게 문의하거나 웹사이트의 고객문의 이메일을 통해 할 수 있습니다.
      </p>
      <br />
      <h3 id="-12-">제 12조 분석</h3>
      <p>
        두디스는 서비스를 방문하는 사용자 수, 가장 많이 요청된 정보 및 사용자와
        서비스의 상호 작용 방법 등, 당사 서비스와 사용자의 상호 작용을 여러 가지
        방법으로 분석합니다. 수집하는 정보에는 참조하는 웹 사이트, 두디스
        서비스의 내부 페이지 접근 횟수 및 빈도, 페이지 조회 시간 등이
        포함됩니다. 이를 통해 두디스는 서비스에 대한 사용자 경험과 서비스를
        개선할 수 있습니다. 정보는 가명으로 처리됩니다.
      </p>
      <ul>
        <li>법적 근거: 일반 개인 정보보호법 제6조 1항 f호</li>
      </ul>
      <br />
      <h5>1) Google Analytics</h5>
      <p>
        두디스는 사용자가 서비스와 상호 작용하는 방식을 이해할 수 있도록 Google
        Analytics를 사용합니다.
      </p>
      <p>
        Google은 이 데이터를 사용하여 어떤 페이지가 가장 인기가 있는지, 어떤
        기능이 사용자에게 작동하는지 (또는 작동하지 않는지), 사이트가 다른 위치
        및 언어에서 얼마나 빠르거나 느린지를 결정합니다.
      </p>
      <p>
        Google에 보내는 모든 데이터는 익명 처리됩니다. 우리는 사이트에서 귀하
        또는 다른 사용자를 개인적으로 식별하는 데 사용할 수 있는 정보를 보내지
        않습니다.
      </p>
      <p>
        귀하의 웹 사이트 사용 (귀하의 IP 주소 포함)에 대한 쿠키에 의해 생성된
        정보는 Google 서버에 전송되어 미국의 서버에 저장됩니다.
      </p>
      <p>
        Google은 귀하의 웹 사이트 사용을 평가하고 보고서를 작성하기 위해이
        정보를 사용합니다.
      </p>
      <p>
        웹 사이트 운영자를 위한 웹 사이트 활동 및 웹 사이트 활동 및 인터넷
        사용과 관련된 기타 서비스 제공.
      </p>
      <p>
        Google은 법에 의해 요구되는 경우 또는 제 3자가 Google을 대신하여 정보를
        처리하는 경우 제 3 자에게이 정보를 전송할 수 있습니다.
      </p>
      <p>Google은 IP 주소를 Google이 보유한 다른 데이터와 연결하지 않습니다.</p>
      <p>
        브라우저에서 적절한 설정을 선택하여 쿠키 사용을 거부 할 수 있지만 이
        경우이 웹 사이트의 모든 기능을 사용하지 못할 수도 있습니다.
      </p>
      <p>
        이 웹 사이트를 사용함으로써 위에 명시된 방식 및 목적으로 귀하가
        Google에서 귀하의 데이터를 처리하는 데 동의하게 됩니다.
      </p>
      <p>
        Google 애널리틱스 인구 통계 및 관심 분야 보고서 : 이 기능을 통해 방문자
        나이, 성별 및 관심 분야와 관련된 행동 정보를 익명 및 총체적 수준에서
        파악할 수 있습니다.
      </p>
      <p>
        이 정보는 특정 사용자의 레벨에서 제공되지 않습니다. 이 기능은 Google
        사이트를 방문하는 동안 사용자에게 더 나은 경험을 제공하기 위해 탐색
        행동을 이해하는 데 도움이 됩니다.
      </p>
      <p>
        Google 애널리틱스를 통한 DoubleClick 플랫폼 및 리 마케팅 : 이 기능은 웹
        분석 및 유료 광고 플랫폼을 통합하여 추가적인 통찰력을 제공합니다.
      </p>
      <p>
        이를 통해 우리는 광고를 더 잘 맞추고 다른 사이트를 방문하는 동안 광고를
        볼 수 있습니다.
      </p>
      <br />
      <h5>2) Google Tag Manager</h5>
      <p>
        두디스는 투명성을 위해 Google Tag Manager(이하 ‘GTM’)를 사용하고 있음을
        알려드립니다.
      </p>
      <p>
        GTM은 자체적으로 개인 식별 정보를 수집하지 않습니다. 태그 매니저를
        사용하면 태그를 쉽게 통합하고 관리할 수 있습니다.
      </p>
      <p>
        태그는 트래픽 및 사용자 행동을 측정하고, 온라인 광고 및 소셜 채널의
        효과를 기록하며, 리마케팅을 설정하고, 대상 그룹에 집중하며, 웹사이트와
        다른 사항 간에 테스트하고 최적화하는 데 사용되는 소형의 코드 요소입니다.
        비활성화하는 경우 GTM에서 이를 고려하게 됩니다. GTM에 관한 자세한 내용은
        다음을 참조하십시오.
      </p>
      <p>
        <a href="https://www.google.com/analytics/tag-manager/use-policy/">
          https://www.google.com/analytics/tag-manager/use-policy/
        </a>
      </p>
      <br />
      <h5>3) Hotjar</h5>
      <p>
        본 서비스를 최적화하기 위해 Hotjar Ltd.(
        <a href="https://www.hotjar.com/">https://www.hotjar.com</a>)의 기술을
        사용해 데이터를 수집하고 저장합니다. 이 데이터는 익명으로 사용 프로필을
        생성하는 데 사용할 수 있습니다. 쿠키는 해당 용도로 사용될 수 있습니다.
      </p>
      <p>
        Hotjar 기술로 수집된 데이터는 이 웹사이트 방문자를 개인적으로 식별하기
        위해 사용되지 않으며, 해당 개인의 명시적인 동의 없이 가명 소지자에 관한
        개인 식별 정보와 결합되지 않습니다.
      </p>
      <p>
        귀하는 Hotjar 수신 거부 페이지{' '}
        <a href="https://www.hotjar.com/legal/compliance/opt-out에서">
          https://www.hotjar.com/legal/compliance/opt-out에서
        </a>{' '}
        ‘Disable Hotjar’ 를 클릭하거나 브라우저의 Do Not Track(DNT)을
        활성화함으로써 Hotjar 사용 가능 사이트를 방문할 때 Hotjar가 귀하의
        정보를 수집하지 못하도록 선택할 수 있습니다.
      </p>
      <br />
      <h3 id="-13-privacy-policies-of-3rd-parties-we-integrate-with-">
        제 13조{' '}
        <strong>Privacy Policies of 3rd Parties We Integrate With</strong>
      </h3>
      <ul>
        <li>
          Applies to All Customers -{' '}
          <a href="https://policies.google.com/privacy">
            Google Privacy Policy
          </a>
        </li>
        <li>
          Applies to All Customers -{' '}
          <a href="https://developers.google.com/youtube/terms/developer-policies#definition-youtube-api-services">
            YouTube API Terms of Service
          </a>
        </li>
        <li>
          Applies to All Customers -{' '}
          <a href="https://www.youtube.com/t/terms">Terms of Service</a>
        </li>
        <li>
          Applies to All Customers -{' '}
          <a href="https://play.google.com/about/developer-distribution-agreement.html">
            Google Play Developer Distribution Agreement
          </a>
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPage;