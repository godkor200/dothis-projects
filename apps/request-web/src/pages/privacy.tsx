import Container from '@dothis/share/components/layout/Container';
import { typo } from '@dothis/share/lib/styles/chakraTheme';
import { css } from '@emotion/react';
import Head from 'next/head';

import LayoutTemplate from '@/components/layout/LayoutTemplate';

export default function Privacy() {
  return (
    <LayoutTemplate>
      <Head>
        <title>두디스 | 개인정보 처리방침</title>
      </Head>
      <Container css={contentsStyle}>
        <div className="privacy-textarea">
          두디스 개인정보 처리방침
          <br />
          <br />
          본 약관은 2022년 9월 30일에 작성되어 시행합니다.
          <br />
          <br />
          두디스를 운영하는 주식회사 두디스(이하 “회사”라 함)는 회원님들의 개인
          정보를 소중히 다루고 있습니다.
          <br />
          <br />
          회사는 정보통신망 이용 촉진 및 정보 보호 등에 관한 법률을 비롯하여
          회사가 준수하여야 할 관련 법령상의 개인 정보보호 규정을 준수하고 관련
          법령에 의거한 개인정보 처리방침을 통해 회원님의 개인 정보가 보호받을
          수 있도록 최선을 다하고 있습니다. 개인 정보 처리 방침 및 개인 정보
          보호 정책을 통해 이용자가 제공한 개인 정보가 어떠한 용도와 방식으로
          이용되며, 개인 정보 보호를 위해 어떻게 관리되고 있는지에 대해
          안내드립니다.
          <br />
          <br />
          1. 수집하는 개인 정보 항목 및 수집 방법
          <br />
          <br />
          회원 가입 시 또는 서비스 이용 과정에서 홈페이지 등을 통해 서비스
          제공을 위한 최소한의 개인 정보를 아래와 같이 수집하고 있습니다.
          <br />
          <br />
          <li className="privacy-list1">필수 (공통)</li>
          <li className="privacy-list2">
            접속 시 이용한 플랫폼, 접속 시 이용한 플랫폼의 아이디, 이메일,
            닉네임
          </li>
          <li className="privacy-list2">
            정산처리를 위해 정보를 등록하는 경우 (크리에이터)
          </li>
          <li className="privacy-list2">
            개인: 이름, 전화번호, 주소, 주민등록번호(외국인 등록번호), 신분증
            사본, 이용 은행 명, 계좌번호, 예금주, 통장 사본, 법정 대리인 정보
            (만 19세 미만의 미성년자인 경우에 한함)
          </li>
          <li className="privacy-list2">
            사업자(개인/법인): 상호/법인 명, 전화번호, 주소, 사업자등록번호,
            업종 및 업태, 대표자명, 담당자명, 담당자 연락처, 사업자등록증 사본,
            이용 은행 명, 계좌번호, 예금주, 통장 사본
          </li>
          <li className="privacy-list2">
            외국인(일정 조건에 해당하는 경우에 한함): 이름, 전화번호, 주소,
            국적, 신분증 번호, 신분증 사본, 이용 은행 명, 계좌번호, 예금주, 통장
            사본, Paypal 계정
          </li>
          <br />
          위 정보를 제공하지 않아도 두디스 서비스의 일부를 이용할 수 있으나,
          후원 받은 캐시를 정산 받을 수 없습니다.
          <br />
          <br />
          <li className="privacy-list1">두디스 포인트 충전 시</li>
          <li className="privacy-list2">
            신용카드 결제 시: 카드사 명, 결제 승인번호 등
          </li>
          <li className="privacy-list2">
            휴대폰 소액결제 시: 통신사, 결제 승인번호, 휴대전화 번호 일부 등
          </li>
          <li className="privacy-list2">
            인터넷뱅킹 / 가상 계좌 결제 시: 이용 은행, 결제 승인번호 등
          </li>
          <li className="privacy-list2">
            토스 결제 시: 결제 승인번호, 휴대전화 번호 일부 등
          </li>
          <li className="privacy-list2">
            카카오페이 결제 시: 결제 승인번호(공통), 카드사 명(카드 결제 시) 등
          </li>
          <li className="privacy-list2">
            PAYCO 결제 시: 결제 승인번호, PAYCO ID 일부(이상 공통), 카드사
            명(카드 결제 시) 등
          </li>
          <li className="privacy-list2">
            네이버페이 결제 시: 결제 승인번호, 결제자 명(일부), 결제 방법 등
          </li>
          <li className="privacy-list2">
            삼성페이 결제 시: 결제 승인번호, 결제자 명(일부), 결제 방법 등
          </li>
          <li className="privacy-list2">
            Paypal 결제 시: Paypal 계정(이메일), 이름, 결제 승인번호
          </li>
          <br />
          <li className="privacy-list1">
            본인 및 법정대리인 확인 절차 진행 시 (공통)
          </li>
          <li className="privacy-list2">
            이름, 생년월일, 성별, 휴대전화 정보, 사용 중인 이동통신사 정보,
            대행사가 제공하는 본인확인 고유 ID 등
          </li>
          <br />
          <li className="privacy-list1">
            기타 회원의 서비스 이용 과정에 따라 아래와 같은 정보가 자동으로
            생성되어 수집될 수 있습니다.
          </li>
          <li className="privacy-list2">
            IP 주소, 쿠키, 방문 일시, 서비스 이용 내역, 올바르지 않은 서비스
            이용으로 인한 제재 내역, 단말기 모델명, 단말기 OS 정보, 단말기
            고유번호, 단말기 펌웨어 버전, 통신사 정보, 네트워크 기반 위치정보,
            단말기 고유 토큰 값
          </li>
          <br />
          <li className="privacy-list1">
            회사는 위의 개인 정보를 아래와 같은 방법으로 수집합니다.
          </li>
          <li className="privacy-list2">
            사용자의 입력을 통한 수집: 홈페이지 회원가입, 모바일 앱, 서면 양식,
            팩스, 전화, 온라인 고객센터 문의, 이메일, 이벤트 응모
          </li>
          <li className="privacy-list2">
            사용자의 동의를 통한 수집: 두디스가 지원하는 플랫폼의 공식 API 이용
            (YouTube, Instagram 등), 협력/제휴/대행업체로부터의 제공, 생성 정보
            수집 툴을 통한 수집
          </li>
          <br />
          <li className="privacy-list1">
            위 ‘사용자의 동의를 통한 수집’ 항목 중, 사용자가 이용하고자 하는
            기능에 따라 정상적인 두디스 서비스 제공을 위해 YouTube Data API 혹은
            Google API를 통하여 아래 정보가 사용자의 동의하에 조회 혹은 수집될
            수 있습니다.
          </li>
          <li className="privacy-list2">
            크리에이터/시청자 공통: 로그인 정보, 회원 프로필
          </li>
          <li className="privacy-list2">
            크리에이터: 채널 정보 (채널 이름, 채널 주소 등), 채팅 목록, 구독자
            목록, Super Chat 목록, 멤버십(스폰서) 정보
          </li>
          <li className="privacy-list2">
            단, 일부 항목의 경우 개별 주체가 특정 항목의 정보 제공에 동의하지
            않거나 해당 플랫폼의 요청이 있을 경우 이에 해당하는 정보를 제외하고
            조회 혹은 수집합니다.
          </li>
          <br />
          위 항목 중 주민등록번호(외국인 등록번호), 여권번호, 운전면허번호 등
          「개인 정보 보호법」 제24조제1항 및 규제「개인 정보 보호법 시행령」
          제19조에 따라 고유 식별 정보로 분류되는 개인 정보의 경우 암호화하여
          안전하게 관리하고 있으며, 사전에 고지한 목적 혹은 법률이 규정하고 있는
          목적 이외의 용도로 사용 혹은 제공되지 않습니다.
          <br />
          <br />
          2. 수집하는 개인 정보의 이용목적
          <br />
          <br />
          <li className="privacy-list1">앱(웹) 회원 가입 및 관리</li>
          <li className="privacy-list2">
            회원 가입 의사 확인, 회원제 서비스 제공에 따른 본인 식별 및 인증,
            회원 자격 유지 및 관리, 서비스 부정이용 방지, 불량 이용 회원에 대한
            이용 제재, 법정대리인 동의 여부 확인(대상자에 한함) 등
          </li>
          <br />
          <li className="privacy-list1">재화 또는 서비스 제공</li>
          <li className="privacy-list2">
            서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금 정산 및
            콘텐츠 제공, 구매 및 요금 결제, 물품 배송 또는 청구서 등의 발송,
            본인인증, 구매, 요금 결제, 요금 추심, 국세청 소득신고 혹은
            세금계산서 발행, 법정대리인 동의 여부 확인(대상자에 한함) 등
          </li>
          <br />
          <li className="privacy-list1">고충처리</li>
          <li className="privacy-list2">
            민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락 및 처리결과
            통보 혹은 통지, 분쟁 조정을 위한 기록 보존, 고지사항 전달, 본인 의사
            확인, 불만 처리 등 원활한 의사소통 경로의 확보
          </li>
          <br />
          <li className="privacy-list1">마케팅 및 광고</li>
          <li className="privacy-list2">
            새로운 서비스나 상품, 이벤트 정보 등의 최신 정보 안내, 인구통계학적
            특성에 따른 서비스 제공 및 광고 게재, 서비스 유효성 확인, 광고성
            정보 제공, 접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계 등
          </li>
          <br />
          3. 개인 정보의 처리 및 보유기간
          <br />
          <br />
          회사는 회원으로부터 수집한 개인 정보에 대해 회원자격이 유지되는 기간
          내에서 개인 정보를 처리 및 보유하며, 개인 정보의 처리 목적이 달성되면
          지체 없이 파기합니다.
          <br />
          다만, 회원에게 사전 동의 받았거나 관련 법령에 의거하여 보존할 필요성이
          있는 경우에는 일정 기간 동안 보유합니다. 현행법상 이와 관련된 법률은
          아래와 같습니다.
          <br />
          <br />
          <li className="privacy-list1">
            전자상거래 등에서의 소비자보호에 관한 법률
          </li>
          <li className="privacy-list2">
            계약 또는 청약철회 등에 관한 기록 (5년)
          </li>
          <li className="privacy-list2">
            대금 결제 및 재화 등의 공급에 관한 기록 (5년)
          </li>
          <li className="privacy-list2">
            소비자의 불만 또는 분쟁처리에 관한 기록 (3년)
          </li>
          <li className="privacy-list2">표시/광고에 관한 기록 (6개월)</li>
          <br />
          <li className="privacy-list1">전자금융거래법</li>
          <li className="privacy-list2">전자금융에 관한 기록 (5년)</li>
          <br />
          <li className="privacy-list1">통신비밀보호법</li>
          <li className="privacy-list2">로그인 기록 (3개월)</li>
          <br />
          <li className="privacy-list1">회원의 동의를 받은 경우</li>
          <li className="privacy-list2">보존 기간: 동의를 받은 기간까지</li>
          <br />
          <li className="privacy-list1">
            회원의 동의 및 관계 법령과 무관하게, 아래 경우에 해당하는 경우 해당
            사유 종료 시까지 개인 정보를 보유할 수 있습니다.
          </li>
          <li className="privacy-list2">
            관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우 해당 수사, 조사
            종료 시까지
          </li>
          <li className="privacy-list2">
            회사의 서비스 이용에 따른 채권, 채무관계 잔존 시 해당 채권, 채무관계
            정산 시까지
          </li>
          <br />
          4. 개인 정보의 제3자 제공
          <br />
          <br />
          회사는 회원의 개인 정보를 처리 목적에 명시한 범위 내에서만 처리합니다.
          <br />
          다만, 아래와 같이 회원의 동의, 법률의 특별한 규정 등에 해당하는
          경우에는 개인 정보를 제3자에게 제공합니다.
          <br />
          <br />
          <li className="privacy-list1">
            회원의 서비스 이용에 따른 정산을 처리해야 하는 경우
          </li>
          <li className="privacy-list1">
            회원으로부터 별도의 동의를 받은 경우
          </li>
          <li className="privacy-list1">법률 등에 특별한 규정이 있는 경우</li>
          <li className="privacy-list1">
            사람의 생명 및 신체에 긴급한 위험이 발생한 경우에 정보주체의 동의를
            받을 수 없는 정당한 사유가 있는 경우
          </li>
          <li className="privacy-list1">
            통계 작성 및 학술연구 등의 목적을 위하여 필요한 경우로서 특정 개인을
            알아볼 수 없는 형태로 개인 정보를 제공하는 경우
          </li>
          <br />
          회사로부터 개인 정보를 제공받는 제3자(제휴처)의 경우 아래 현황에서
          확인할 수 있습니다.
          <br />
          위 제3자에게 회원의 개인 정보를 제공 혹은 공유하는 경우 사전에 회원의
          동의 절차를 거치며, 개인 정보를 제공받는 자, 개인 정보 이용 목적,
          제공하는 개인 정보의 항목, 개인 정보 보유 및 이용 기간, 정보제공
          동의를 거부할 권리가 있다는 사실, 동의 거부에 따른 불이익 등을
          명시하여 회원님께 동의를 구합니다.
          <br />
          <br />
          5. 개인 정보 처리의 위탁
          <br />
          <br />
          회사는 원활한 업무처리를 위하여 회원이 동의한 목적 또는 계약의 체결,
          유지, 이행, 관리 등의 목적으로 아래와 같이 개인 정보 처리 업무를 전문
          업체에 위탁하고 있습니다.
          <br />
          <br />
          <li className="privacy-list1">개인정보 처리 수탁 업체 목록</li>
          <br />
          회사는 개인 정보 위탁 시 해당 업체가 개인 정보를 안전하게 처리하는지를
          감독하고 있으며, 위탁업무의 내용이나 위탁업체가 변경되는 경우 지체
          없이 수정 및 공개하겠습니다.
          <br />
          <br />
          6. 개인 정보의 파기 절차 및 방법
          <br />
          <br />
          회사는 개인 정보 보유기간의 경과, 처리 목적 달성 등 개인 정보가
          필요하지 않게 되었을 때에는 지체 없이 해당 개인 정보를 파기합니다.
          다만, 회원으로부터 동의 받은 개인 정보 보유기간이 경과하거나 처리
          목적이 달성되었음에도 불구하고 다른 사유 혹은 법령에 따라 개인 정보를
          계속 보존하여야 하는 아래 경우에 해당할 경우 해당 개인 정보를 별도의
          데이터베이스로 옮기거나 물리적인 보관 장소를 달리하여 보존합니다.
          <br />
          <br />
          <li className="privacy-list1">
            회사가 민/형사상의 책임 또는 시효가 지속되거나 분쟁의 입증자료로서
            개인 정보를 보유하는 경우
          </li>
          <li className="privacy-list1">
            상법 제33조 등 법령에 따라 보존하여야 하는 경우
          </li>
          <li className="privacy-list1">
            기타 이와 유사한 정당한 사유가 있는 경우
          </li>
          <li className="privacy-list1">파기방법</li>
          <li className="privacy-list2">
            전자적 파일 형태로 기록 및 저장된 개인 정보는 기록을 재생할 수
            없도록 파기하며, 종이 문서에 기록 및 저장된 개인 정보는 분쇄기로
            분쇄하거나 소각하여 파기합니다.
          </li>
          <br />
          <br />
          7. 회원 및 법정대리인의 권리와 행사방법
          <br />
          <br />
          회원 및 법정대리인(만 14세 미만 회원의 경우)은 회사에 대해 언제든지
          아래에 대한 개인 정보 보호 관련 권리를 행사할 수 있습니다.
          <br />
          <li className="privacy-list1">개인 정보 열람 요구</li>
          <li className="privacy-list1">오류 등이 있을 경우 정정 요구</li>
          <li className="privacy-list1">
            삭제 요구 (다만, 다른 법령에서 그 개인 정보의 수집 대상으로 명시되어
            있는 경우에는 그 삭제를 요구할 수 없습니다.)
          </li>
          <li className="privacy-list1">
            탈퇴 혹은 개인 정보 처리 중지 요구 (서비스의 일부 또는 전체의 이용이
            어려울 수 있습니다.)
          </li>
          <br />
          <br />
          등록된 개인 정보의 조회는 회사가 정한 절차에 따라 본인확인 (혹은
          법정대리인 확인) 절차 진행 후 열람 및 정정이 가능하며, 탈회는 홈페이지
          로그인 후 ‘회원 탈퇴’ 메뉴를 클릭하여 진행할 수 있습니다. 회사에서
          지정한 방법을 이용하기 어려우신 경우 고객센터에 문의 혹은 개인
          정보관리 책임자에게 서면 혹은 이메일과 같은 전자 문서로 연락해 주시면
          지체 없이 처리하겠습니다.
          <br />
          <br />
          8. 개인 정보 자동 수집 장치의 설치, 운영 및 그 거부에 관한 사항
          <br />
          <br />
          회사는 회원의 정보를 수시로 저장하고 찾아내는 쿠키(cookie) 등 개인
          정보를 자동으로 수집하는 장치 혹은 기술을 설치/운용합니다. 쿠키란
          회사의 웹사이트를 운영하는데 이용되는 서버가 회원님의 웹 브라우저에
          보내는 작은 텍스트로, 회원의 컴퓨터 저장 장치에 저장됩니다.
          <br />
          <br />
          회사는 쿠키 등을 다음과 같은 목적을 위해 사용합니다.
          <br />
          <li className="privacy-list1">
            회사가 제공하는 상품, 콘텐츠, 캐시 구매 시 인증
          </li>
          <li className="privacy-list1">
            이용자의 관심 분야에 따라 차별화된 정보 제공
          </li>
          <li className="privacy-list1">유료 서비스 이용 시 이용 기간 안내</li>
          <li className="privacy-list1">
            이용자의 이용패턴 분석을 통한 서비스 개편의 척도로 활용
          </li>
          <li className="privacy-list1">서비스 이용 및 게시판 글 등록</li>
          <li className="privacy-list1">
            이벤트 및 설문조사 시 참여 내역 등 활동 내역 확인
          </li>
          <br />
          회원님은 쿠키 설치 및 이용 권한에 대한 선택권을 가지고 있으며, 직접
          사용 중인 웹 브라우저에서 옵션을 설정함으로써 웹 브라우저가 지원하는
          설정에 따라 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을
          거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.
          <br />
          <br />
          9. 개인 정보의 기술적/관리적 보호대책
          <br />
          <br />
          회사는 회원의 개인 정보를 취급함에 있어 개인 정보가 분실, 도난, 누출,
          변조 도는 훼손되지 않도록 기술적인 관리적 보호 조치를 위하여 다음과
          같은 대책을 강구하고 있습니다.
          <br />
          <br />
          <li className="privacy-list1">접근통제 및 권한의 관리</li>
          <li className="privacy-list2">
            회사는 개인 정보에 대한 접근 권한을 업무 수행에 필요한 최소한의
            범위로 하여 각 업무 담당자에게 각 한 개의 계정을 지급하여 권한을
            차등 부여하고 있으며, 개인 정보 취급자 및 담당 업무가 변경되었을
            경우 개인 정보에 대한 접근 권한을 변경 또는 말소하고 있습니다.
          </li>
          <li className="privacy-list2">
            또한 개인 정보 책임자 및 취급자가 외부에서 개인 정보에 접근하려는
            경우 VPN, 보안 연결 등 안전한 접속 수단을 사용하고 있으며, 외부인 등
            권한이 없는 자가 개인 정보를 열람할 수 없도록 개인 정보 조회 및
            처리를 위한 시스템과 개인 PC에 조치를 취하고 있습니다.
          </li>
          <li className="privacy-list1">개인 정보의 암호화</li>
          <li className="privacy-list2">
            회사는 정보통신망 혹은 보조 저장매체를 통하여 송/수신하는 모든 개인
            정보에 대해 반드시 암호화하여 처리하고 있으며, 가급적 업무용 PC에
            개인 정보를 보관하지 않고 부득이한 사유로 보관해야 하는 경우 해당
            데이터를 암호화하여 안전하게 보관/처리하고 있습니다.
          </li>
          <li className="privacy-list2">
            또한 개인 정보보호법에 의거하여 고유식별 번호 (주민등록번호, 외국인
            등록번호 등), 비밀번호 및 민감한 개인 정보 등은 안전한 알고리즘으로
            암호화하여 저장, 보관하고 있습니다.
          </li>
          <li className="privacy-list1">
            접속기록의 보관 및 위변조 방지와 물리적 조치
          </li>
          <li className="privacy-list2">
            회사는 개인 정보 취급자가 시스템상으로 개인 정보를 처리한 기록을
            최소 3개월 이상 보관하며 해당 기록이 위변조 및 도난, 분실, 삭제되지
            않도록 안전하게 보관하고 있습니다.
          </li>
          <li className="privacy-list2">
            또한 서버 등 개인 정보를 보관하고 있는 물리적 보관 장소의 경우
            임의로 출입할 수 없는 장소로 지정하여 운영하고 있으며, 개인 정보가
            포함된 서류, 전자 문서, 보조 저장매체 등을 잠금장치 등으로 보호받는
            안전한 장소에 보관하고 있습니다.
          </li>
          <br />
          <br />
          10. 개인 정보관리 책임자에 관한 사항
          <br />
          <br />
          회사는 회원의 개인 정보를 보호하고 개인 정보와 관련한 불만 및 민원을
          처리하기 위해 아래와 같이 개인 정보보호 책임자와 개인 정보보호
          담당자를 지정하고 있습니다. 열람, 정정 요청 등 개인 정보와 관련한
          문의사항이 있으시면 두디스 온라인 고객센터 혹은 아래 개인 정보보호
          담당자에게 연락하여 주시기 바랍니다.
          <br />
          <br />
          <li className="privacy-list1">
            개인정보보호책임자
            <br />
            &emsp; 성명: 민상현
            <br />
            &emsp; 직책: 대표이사
            <br />
            &emsp; 전화번호: 1500-0000
            <br />
            &emsp; 이메일: ceo@dothis.world
          </li>
          <li className="privacy-list1">
            개인정보보호담당자
            <br />
            &emsp; 성명: 박순헌
            <br />
            &emsp; 직책: 연구소장
            <br />
            &emsp; 전화번호: 1688-2918
            <br />
            &emsp; 이메일: sunheon@dothis.world
          </li>
          <br />
          11. 권익 침해 구제방법
          <br />
          <br />
          회원은 아래의 기관에 개인 정보 침해에 대한 피해 구제, 상담 등을
          문의하실 수 있습니다.
          <br />
          <br />
          <li className="privacy-list1">
            개인정보 분쟁조정위원회 (www.kopico.go.kr / 전화 1833-6972) /
            www.kopico.go.kr
          </li>
          <li className="privacy-list1">
            개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118) /
            privacy.kisa.or.kr
          </li>
          <li className="privacy-list1">
            대검찰청 사이버범죄수사단 (www.spo.go.kr / 02-3480-3571) /
            www.spo.go.kr
          </li>
          <li className="privacy-list1">
            경찰청 사이버안전국 (cyberbureau.police.go.kr / 국번없이 182) /
            cyberbureau.police.go.kr
          </li>
          <br />
          12. 본 개인정보 처리방침의 적용 범위
          <br />
          <br />
          본 개인정보 처리방침은 회사의 서비스 중 하나인 두디스 및 관련 제반
          서비스 (웹/앱 포함)에 적용되며, 다른 브랜드로 제공되는 서비스에
          대해서는 별개의 개인정보 처리방침이 적용될 수 있습니다.
          <br />
          또한 두디스 서비스에 링크 되어있는 다른 회사의 웹/앱에서 개인 정보를
          수집하는 경우, 해당 웹/앱의 개인정보 처리방침을 따릅니다.
          <br />
          <br />
          13. 개인정보 취급방침의 변경에 관한 사항
          <br />
          <br />
          개인정보 처리방침의 내용 추가, 삭제, 변경이 있을 경우 가급적 7일 전에
          사전 고지를 진행하고, 만약 수집 개인 정보의 항목, 이용 목적의 변경 등
          회원 권리의 중대한 변경이 발생하는 경우 최소 30일 전에 고지하겠습니다.
        </div>
      </Container>
    </LayoutTemplate>
  );
}

const contentsStyle = css`
  height: auto;
  word-wrap: break-word;
  margin-top: 48px;
  margin-bottom: 48px;

  .privacy-textarea {
    ${typo.b2};
    text-align: left;
  }

  .privacy-list1 {
    list-style-type: disc;
  }
  .privacy-list2 {
    list-style-type: circle;
    margin-left: 18px;
  }
`;
