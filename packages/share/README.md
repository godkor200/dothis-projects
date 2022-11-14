## Share Package

share 패키지는 도메인에 얽메이지 않고, api나 db에 의존하지 않는 공통적인 기능을 제공합니다.

### Struct

#### components/

공통적으로 사용되는 컴포넌트들을 모아놓은 폴더입니다.

#### lib/models/

여기서의 모델은 클라이언트단의 모델이며 하나의 커다란 개념에 속하는 유틸이라고 생각하시면 됩니다.

- globalStore: 전역 상태를 관리하는 모델입니다.
- Message: 메시지를 관리하는 모델입니다. 이 메시지를 통해 서버-클라이언트, 서버-서버, 클라이언트-클라이언트 간에 메시지를 전달합니다.
- Modal: 모달을 관리하는 모델입니다. 이 모델의 useModalStore 훅을 통해 모달을 띄우고 닫을 수 있습니다.
- Toast: 토스트를 관리하는 모델입니다. 이 안에 standaloneToast를 통해 context를 지정하고 toast를 띄울 수 있습니다.

#### lib/hooks/

react의 생에 주기에 따른 hooks를 모아놓은 폴더입니다.

#### lib/styles/

chakra theme와 공통적인 스타일을 모아놓는 폴더입니다. 

이 폴더 내부의 chakraTheme의 index.ts를 통해 chakra-cli를 통한 theme generate가 이루어집니다.
lib/types/theme.d.ts로 생성됩니다.

#### lib/types/
유틸리티 타입, 공통적으로 사용되는 타입, declare 될 타입들을 모아놓는 폴더입니다.

#### lib/utils/
유틸리티 함수들



### packages

- [multer](https://www.npmjs.com/package/multer) - 파일 업로드를 위한 미들웨어
- [multer-s3"](https://www.npmjs.com/package/multer-s3) - aws s3에 파일 업로드를 위한 미들웨어 확장
- [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) infinity 스크롤을 위하여 사용자가 얼마나 컨텐츠를 보았는지 확인하는 라이브러리