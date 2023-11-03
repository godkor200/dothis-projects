## 프리즈마 DB 명세서

### 1. 전체 테이블 정보

| 테이블명              | 설명                                                                     | 출처               | 비고                                   |
| --------------------- | ------------------------------------------------------------------------ | ------------------ | -------------------------------------- |
| Account               | 소셜 로그인 정보를 포함한 로그인과 관련된 기본 정보가 저장됨             | next-auth          |                                        |
| Session               | 로그인한 사용자의 세션 정보가 저장되는 임시 테이블                       | next-auth          |                                        |
| User                  | 사용자 프로필 정보가 저장됨                                              | next-auth + dothis |                                        |
| VerificationToken     | 사용자 인증에 대한 토큰 정보가 저장됨                                    | next-auth          |                                        |
| RequestPost           | 요청글에 대한 기본 정보가 저장됨                                         | dothis             |                                        |
| RequestFunding        | 요청에 대한 후원금 정보가 저장됨                                         | dothis             |                                        |
| RequestComment        | 요청에 대한 댓글 정보가 저장됨                                           | dothis             |                                        |
| RequestReaction           | 요청에 대한 좋아요와 같은 반응 정보가 저장됨                             | dothis             |                                        |
| RequestBookmark           | 요청에 대한 북마크(찜하기) 정보가 저장됨                                 | dothis             | MVP에서는 미사용                       |
| RequestPlatform       | 요청에 등록하는 플랫폼 정보가 저장됨                                     | dothis             |                                        |
| RequestApplyCreator        | 요청에 지원한 크리에이터 정보들이 저장됨                      | dothis             | MVP 이후에는 여러명 지정됨             |
| RequestReport         | 요청 화면에서 신고하기 기능을 통해 신고된 정보가 저장됨                  | dothis             |                                        |
| RequestInquiry        | 요청글에서 문의하기를 통한 후원자와 크리에이터 간의 채팅방 정보가 저장됨 | dothis             | MVP에서는 미사용                       |
| RequestInquiryMessage | 채팅방의 메시지 정보들이 저장됨                                          | dothis             | MVP에서는 미사용                       |
| Alarm                 | 서비스에서 발생하는 각종 알람 정보가 저장됨                              | dothis             |                                        |
| Point                 | 서비스에서 충전한 포인트의 충전, 이용 내역이 저장됨                      | dothis             |                                        |
| Ranking               | 서비스 사옹자들의 랭킹 정보들이 저장됨                                   | dothis             | MVP에서는 미사용, 배치로 처리할 테이블 |
| Faq                   | 자주 묻는 질문에 대한 내용을 저장하는 테이블                             | dothis             |                                        |
| Notice                | 두디스의 공지사항을 저장하는 테이블                                      | dothis             |                                        |
| Creator               | 크리에이터에 대한 기본 정보들이 저장됨                                   | dothis             |                                        |
| CreatorAuth           | 크리에이터의 인증 내용에 대한 정보들이 저장됨                            | dothis             |                                        |
| CreatorReview         | 후원자가 크리에이터를 리뷰한 내용이 저장됨                               | dothis             | MVP에서는 미사용                                       |
| CreatorReviewItem     | 후원자가 크리에이터를 리뷰한 내용의 각 항목들이 저장됨                   | dothis             | MVP에서는 미사용                                       |
|                       |

### 2. 개별 테이블 정보

#### (1) Account

| 컬럼명            | 타입   | 키정보 | Nullable | 설명                                                         |
| ----------------- | ------ | ------ | -------- | ------------------------------------------------------------ |
| id                | String | PK     |          | 계정의 가장 기본이 되는 식별자                               |
| userId            | String | FK     |          | 사용자의 아이디이지만 소셜 로그인시 계정 id 필드와 값이 동일 |
| type              | String |        |          | 계정의 가입 유형에 대한 정보 ex)oauth                        |
| provider          | String |        |          | 계정 정보 공급업체 이름 ex)google                            |
| providerAccountId | String |        |          | 계정 정보 공급업체가 갖고있는 사용자 식별키                  |
| refresh_token     | String |        | Y        | ?                                                            |
| access_token      | String |        | Y        | 계정 정보 공급업체에 접근시 필요한 토큰 값                   |
| expires_at        | Int    |        | Y        | 계정 정보 공급과 관련된 만료시간으로 추정                    |
| token_type        | String |        | Y        | oauth와 관련된 토큰 유형 정보                                |
| scope             | String |        | Y        | oauth 요청시 포함되는 범위 정보                              |
| id_token          | String |        | Y        | oauth와 관련된 아이디의 토큰 정보로 추정                     |
| session_state     | String |        | Y        | 로그인 세션의 상태 정보로 추정                               |

#

#### (2) Session

| 컬럼명       | 타입     | 키정보 | Nullable | 설명                          |
| ------------ | -------- | ------ | -------- | ----------------------------- |
| id           | String   | PK     |          | 세션 생성시 부여되는 식별자   |
| sessionToken | String   | UK     |          | 세션에 대한 토큰 정보         |
| userId       | String   | FK     |          | 세션이 생성된 사용자의 아이디 |
| expires      | DateTime |        |          | 세션 만료시간                 |

#

#### (3) User

| 컬럼명        | 타입     | 키정보 | Nullable | 설명                              |
| ------------- | -------- | ------ | -------- | --------------------------------- |
| id            | String   | PK     |          | 사용자의 고유한 아이디            |
| name          | String   |        | Y        | 사용자의 닉네임                   |
| email         | String   | UK     | Y        | 사용자의 이메일                   |
| emailVerified | DateTime |        | Y        | 이메일 인증 시간 정보로 추정      |
| image         | String   |        | Y        | 사용자의 프로필 이미지의 URL 주소 |
| introduction  | String   |        | Y        | 사용자의 프로필의 자기소개        |

#

#### (4) VerificationToken

| 컬럼명     | 타입     | 키정보 | Nullable | 설명                         |
| ---------- | -------- | ------ | -------- | ---------------------------- |
| identifier | String   | UK     |          | 사용자 인증을 위한 식별자    |
| token      | String   | UK     |          | 사용자 인증을 위한 토큰 정보 |
| expires    | DateTime |        |          | 인증 만료 시간               |

#

#### (5) RequestPost

| 컬럼명           | 타입       | 키정보 | Nullable | 설명                                                                                                      |
|---------------|----------| ------ |----------|---------------------------------------------------------------------------------------------------------|
| id            | String   | PK     |          | 요청 게시글에 대한 고유한 아이디                                                                                      |
| createdAt     | String   |        |          | 요청 게시글 생성일                                                                                              |
| updatedAt     | DateTime |        |          | 요청 게시글 수정일                                                                                              |
| userId        | String   | FK     | Y        | 요청 작성 사용자 아이디                                                                                           |
| title         | String   |        |          | 요청 제목                                                                                                   |
| content       | String   |        |          | 요청 내용                                                                                                   |
| category      | String   |        |          | 요청 카테고리                                                                                                 |
| expires       | DateTime |        |          | 요청 만료일                                                                                                  |
| totalViews    | Int      |        |          | 총 조회수                                                                                                   |
| status        | Enum     |        |          | 요청 게시글 상태 (단계: 1. REQUEST, 2. APPLY, 3. ACCEPT, 4. REGISTRATION, 5. COMPLETION, 6.EXPIRATION, 7.REFUSE) |
| creatorId     | String   |        | Y        | 요청에서 최종 선발된 크리에이터                                                                                       |
| thumbnailUrl  | String   |        | Y        | 요청의 썸네일 이미지 주소 URL                                                                                      |
| solvedUrl     | String   |        | Y        | 크리에이터의 결과물 URL                                                                                          |
| refusalReason | String   |        | Y        | 크리에이터의의 요청 포기 사유 URL                                                                                    |
| totalQuantity | Int      |        | N        | 총 펀딩 액                                                                                                  |
| totalLikeScroe | Int      |        | N        | 총 좋아요 점수                                                                                                |
| fundingState | RequestFundingStatus   |        | N        | 펀딩 상태                                                                                                   |


#### * 요청 상태 정보
#### 1. REQUEST : 요청 상태
#### 2. ACCEPT : 크리에이터가 요청을 수락하거나, 지원한 크리에이터들 중 선정이 완료된 경우
#### 3. REGISTRATION : 크레에이터가 등록을 한 상태 (MVP 이후에서는 완료와 등록 사이에 검토 과정 추가 예정)
#### 4. COMPLETION : 요청 콘텐츠가 해결된 상태 (MVP에서는 크리에이터가 콘텐츠를 등록하면 완료)
#### 5. EXPIRATION : 기간이 지나서 요청이 만료된 상태
#### 6. REFUSE : 멘션된 크리에이터가 거절을 한 상태
#

#### (6) RequestFunding

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                             |
| --------- | -------- | ------ | -------- | -------------------------------- |
| id        | BigInt   | PK     |          | 후원금에 대한 고유한 아이디      |
| requestId | BigInt   | FK     | Y        | 후원과 관련된 요청 게시글 아이디 |
| userId    | String   | FK     | Y        | 후원한 사용자 아이디             |
| quantity  | Int      |        |          | 후원한 포인트 수량               |
| createdAt | DateTime |        |          | 후원한 날짜                      |

#

#### (7) RequestComment

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                |
| --------- | -------- | ------ | -------- | ----------------------------------- |
| id        | BigInt   | PK     |          | 댓글에 대한 고유한 아이디           |
| requestId | BigInt   | FK     |          | 댓글에 작성된 요청 게시글 아이디    |
| userId    | String   | FK     | Y        | 댓글을 작성한 사용자 아이디         |
| parentId  | BigInt      |        | Y        | 대댓글 처리를 위한 부모 댓글 아이디 |
| createdAt | DateTime |        |          | 댓글 생성일                         |
| updatedAt | DateTime |        |          | 댓글 수정일                         |
| content   | String   |        |          | 댓글 내용                           |

#

#### (8) RequestReaction

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                                      |
| --------- | -------- | ------ | -------- | --------------------------------------------------------- |
| id        | BigInt   | PK     |          | 요청의 반응(좋아요)에 대한 고유한 아이디                  |
| requestId | BigInt   | FK     |          | 반응이 추가된 요청 게시글 아이디                          |
| userId    | String   | FK     | Y        | 반응을 한 사용자 아이디                                   |
| type      | Enum     |        |          | 반응의 유형, 이후 확장될 수 있음(유형: 1.LIKE, 2.DISLIKE) |
| createdAt | DateTime |        |          | 반응을 추가한 날짜                                        |

#

#### (9) RequestBookmark

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                               |
| --------- | -------- | ------ | -------- | ---------------------------------- |
| id        | BigInt   | PK     |          | 요청의 찜하기에 대한 고유한 아이디 |
| requestId | BigInt   | FK     | Y        | 찜하기된 요청 게시글 아이디        |
| userId    | String   | FK     | Y        | 찜하기를 한 사용자 아이디          |
| createdAt | DateTime |        |          | 찜하기를 한 날짜                   |

#

#### (10) RequestPlatform

| 컬럼명    | 타입   | 키정보 | Nullable | 설명                                                                             |
| --------- | ------ | ------ | -------- | -------------------------------------------------------------------------------- |
| id        | BigInt | PK     |          | 요청글에서 지정한 플랫폼에 대한 고유한 아이디                                    |
| requestId | BigInt | FK     |          | 요청글의 아이디                                                                  |
| name      | Enum   |        |          | 요청글에서 지정한 플랫폼 이름(유형:1.YOUTUBE, 2.INSTAGRAM, 3.FACEBOOK, 4.TWITCH) |

#

#### (11) RequestApplyCreator

| 컬럼명     | 타입    | 키정보 | Nullable | 설명                                                                           |
| ---------- | ------- | ------ | -------- | ------------------------------------------------------------------------------ |
| id         | BigInt  | PK     |          | 요청글에서 지원한 항목에 대한 아이디                                           |
| requestId  | BigInt  | FK     |          | 요청글의 아이디                                                |
| creatorId  | BigInt  | FK     | Y        | 요청글에 지원한 크리에이터 ID                                                         |
| isSelected | Boolean | FK     |          | 크리에이터의 요청에서의 선택 여부(리스트 중에서 한명만 선택되어 참여가 가능함) |

#

#### (12) RequestReport

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                                                                   |
| --------- | -------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| id        | BigInt   | PK     |          | 요청글에서의 신고 항목에 대한 아이디                                                   |
| requestId | BigInt   | FK     |          | 요청글의 아이디                                                                        |
| userId    | String   | FK     | Y        | 신고한 사용자의 아이디                                                                 |
| content   | String   |        |          | 신고한 내용                                                                            |
| type      | Enum     |        |          | 신고 카테고리 유형(유형:1.SEXUAL, 2.VIOLENT, 3.HATEFULE, 4.CHILD, 5.TERRORISM, 6.SPAM) |
| status    | Enum     |        |          | 신고한 내용의 처리 상태(유형:1.PROCESSING, 2.COMPLETION)                               |
| createdAt | DateTime |        |          | 신고한 날짜                                                                            |

#

#### (13) RequestInquiry

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                   |
| --------- | -------- | ------ | -------- | -------------------------------------- |
| id        | BigInt   | PK     |          | 요청과 후원자가 대화하는 채팅방 아이디 |
| requestId | BigInt   | FK     |          | 문의하기를 한 요청의 아이디            |
| creatorId | BigInt   | FK     | Y        | 채팅방의 크리에이터 아이디             |
| userId    | String   | FK     | Y        | 채팅방의 후원자 아이디                 |
| createdAt | DateTime |        |          | 채팅방 생성일                          |

#

#### (14) RequestInquiryMessage

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                                                                                                                                           |
| --------- | -------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id        | BigInt   | PK     |          | 채팅방 메시지의 고유한 아이디                                                                                                                                  |
| roomId    | BigInt   | FK     |          | 메시지가 속한 채팅방의 아이디                                                                                                                                  |
| fromId    | String   | FK     |          | 메시지를 작성한 사용자의 아이디                                                                                                                                |
| text      | String   |        |          | 메시지의 내용                                                                                                                                                  |
| fileUrl   | String   |        | Y        | 첨부한 파일의 URL을 저장                                                                                                                                       |
| type      | Enum     |        |          | 메시지의 유형(유형: 1.TEXT, 2.IMAGE, 3. VIDEO, 4.FILE)                                                                                                         |
| isRead    | Boolean  |        |          | 메시지를 읽었는지 유무, 안읽은 메시지는 작성자ID != 현ID + isRead False인 것의 카운트로 구현이 가능, 채팅방 조회시 현ID의 Message의 해당 필드는 모두 True 처리 |
| createdAt | DateTime |        |          | 메시지 작성 날짜                                                                                                                                               |

#

#### (15) Alarm

| 컬럼명    | 타입   | 키정보 | Nullable | 설명                                  |
| --------- | ------ | ------ | -------- | ------------------------------------- |
| id        | BigInt | PK     |          | 알람 항목에 대한 아이디               |
| userId    | String | FK     |          | 알람의 대상이 되는 사용자의 아이디    |
| content   | String |        |          | 알람의 내용                           |
| link      | String |        | Y        | 알람 클릭시 이동할 링크 정보          |
| status    | Enum   |        |          | 알람의 상태 정보(유형:1.UNREAD, READ) |
| createdAt | String |        |          | 알람 생성일                           |

#

#### (16) Point

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                                                                            |
| --------- | -------- | ------ | -------- | ----------------------------------------------------------------------------------------------- |
| id        | BigInt   | PK     |          | 포인트 이력에 대한 아이디                                                                       |
| userId    | String   | FK     |          | 포인트 이력에 대한 사용자 아이디                                                                |
| quantity  | Int      |        |          | 포인트 수량 정보(출금, 펀딩일 때는 -로 입력)                                                    |
| type      | Enum     |        |          | 포인트 충전, 출금(크리에이터)과 같은 유형 정보(유형:1.WITHDRAW, 2.DEPOSIT, 3.FUNDING, 4.RETURN) |
| createdAt | DateTime |        |          | 포인트와 관련된 이벤트 날짜                                                                     |

#

#### (17) Ranking

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                         |
| --------- | -------- | ------ | -------- | -------------------------------------------- |
| id        | BigInt   | PK     |          | 랭킹 항목에 대한 아이디                      |
| userId    | String   | FK     | Y        | 랭킹 대상에 대한 아이디                      |
| ranking   | Int      |        |          | 현재 시점의 순위                             |
| type      | Enum     |        |          | 랭킹 유형 정보(A에 대한 랭킹, B에 대한 랭킹) |
| score     | BigInt   |        |          | 랭킹 순위                                    |
| change    | Int      |        |          | 이전과 비교하여 변동된 순위                  |
| createdAt | DateTime |        |          | 랭킹 정보에 대한 날짜                        |

#

#### (18) Faq

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                                                  |
| --------- | -------- | ------ | -------- | --------------------------------------------------------------------- |
| id        | BigInt   | PK     |          | 고객센터 문의 항목에 대한 아이디                                      |
| type      | Enum     |        |          | 질문의 유형(유형: 1.BEST, 2.GUIDE, 3.ACCOUNT, 4.CREATOR, 5.BUSSINESS) |
| title     | String   |        |          | 질문의 제목                                                           |
| content   | String   |        |          | 질문의 내용                                                           |
| createdAt | DateTime |        |          | 질문 작성일                                                           |

#

#### (19) Notice

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                      |
| --------- | -------- | ------ | -------- | ------------------------- |
| id        | Int      | PK     |          | 공지사항 게시글에 대한 id |
| title     | String   |        |          | 공지사항 제목             |
| content   | String   |        |          | 공지사항 내용             |
| createdAt | DateTime |        |          | 공지사항 작성일           |

#

#### (20) Creator

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                       |
| --------- | -------- | ------ | -------- | -------------------------- |
| id        | BigInt   | PK     |          | 크리에이터의 고유한 아이디 |
| userId    | String   | FK     |          | 크리에이터의 사용자 아이디 |
| createdAt | DateTime |        |          | 크리에이터로 등록된 날짜   |

#

#### (21) CreatorAuth

| 컬럼명     | 타입     | 키정보 | Nullable | 설명                                                                     |
| ---------- | -------- | ------ | -------- | ------------------------------------------------------------------------ |
| id         | BigInt   | PK     |          | 크리에이터가 플랫폼을 인증한 항목에 대한 아이디                          |
| creatorId  | BigInt   | FK     |          | 인증한 크리에이터의 아이디                                               |
| isMain     | Boolean  |        |          | 인증한 플랫폼이 대표플랫폼인지 체크                                      |
| profileUrl | String   |        |          | 인증한 플랫폼의 프로필 URL을 저장                                        |
| platform   | Enum     |        |          | 인증한 플랫폼의 이름(유형:1. YOUTUBE, 2.INSTAGRAM, 3.FACEBOOK, 4.TWITCH) |
| createdAt  | DateTime |        |          | 크리에이터의 인증 날짜                                                   |

#

#### (22) CreatorReview

| 컬럼명    | 타입     | 키정보 | Nullable | 설명                                          |
| --------- | -------- | ------ | -------- | --------------------------------------------- |
| id        | BigInt   | PK     |          | 후원자가 크리에이터에게 리뷰한 내용에 대한 ID |
| creatorId | BigInt   | FK     |          | 리뷰를 받은 크리에이터 ID                     |
| userId    | String   | FK     | Y        | 리뷰를 한 후원자 ID                           |
| content   | String   |        | Y        | 리뷰에 추가하는 기타 코멘트                   |
| createdAt | DateTime |        |          | 리뷰를 한 날짜                                |

#

#### (23) CreatorReviewItem

| 컬럼명    | 타입    | 키정보 | Nullable | 설명                                                     |
| --------- | ------- | ------ | -------- | -------------------------------------------------------- |
| id        | BigInt  | PK     |          | 후원자가 크리에이터에게 리뷰한 내용 중 각 항목에 대한 ID |
| reviewId  | BigInt  | FK     |          | 항목이 속한 리뷰의 ID                                    |
| content   | String  |        |          | 항목의 내용(ex. 등록된 콘텐츠... 있나요?)                |
| isChecked | Boolean |        |          | 항목의 체크 여부(체크 - true)                            |

