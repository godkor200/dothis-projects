import type { Creator } from '@prisma/client';
import {
  ReactionType,
  RequestCategoryType,
  RequestPlatformType,
  RequestReportStatus,
  RequestReportType,
  RequestStatusType,
} from '@prisma/client';

import { users } from './Users';

/***********
 model RequestPost {
  id            BigInt        @id @default(autoincrement()) @database.BigInt
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
  user          User?         @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId        String?
  title         String        @database.VarChar(255)
  content       String        @database.LongText
  category      RequestCategoryType?        @default(ETC)
  creator       Creator?      @relation(fields: [creatorId], references: [id], onDelete: SetNull)
  creatorId     BigInt?
  expires       DateTime?
  totalViews    Int           @default(0)
  status        RequestStatusType   @default(REQUEST)
  solvedUrl     String?
  thumbnailUrl  String?
  refusalReason String?
  requestApplyCreators RequestApplyCreator[]
  requestPlatforms     RequestPlatform[]  
  requestFundings      RequestFunding[]
  requestComments      RequestComment[]
  requestReactions     RequestReaction[]
  requestBookmarks     RequestBookmark[]
  requestReports       RequestReport[]
  requestInquirys      RequestInquiry[]

  @@index([userId, creatorId, status, createdAt(sort: Desc)])
  @@fulltext([title, content])
  @@map("requestposts")
}
 ***********/

let now = new Date();

// 요청 글
export const requestPosts = (creators: Creator[]) => [
  {
    userId: users[2].id,
    title: '군복입고 롯데리아에서 군대리아 버거 먹방을 해주세요.',
    content:
      '<p>군대리아 버거의 우수성을 전세계에 알리고 싶습니다.<img src="https://images.unsplash.com/photo-1660632031387-760ced651717?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4016&q=80"/></p>',
    category: RequestCategoryType.COOK_EAT,
    creatorId: creators[2]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 1123,
    status: RequestStatusType.COMPLETION,
    solvedUrl: 'https://www.youtube.com/watch?v=FLYsar74dus',
  },
  {
    userId: users[0].id,
    title: '키스신도 요청할 수 있나요?',
    content: '<p>민상현과 뽀구미의 키스신이 궁금합니다.</p>',
    category: RequestCategoryType.ENTERTAINMENT,
    creatorId: creators[0]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 0,
    status: RequestStatusType.ACCEPT,
    //solvedUrl: 'https://www.youtube.com/watch?v=FLYsar74dus',
  },
  {
    userId: users[3].id,
    title: '3대 500치는 팁이 궁금합니다.',
    content: '<p>김계란님은 어떻게 몸이 그리 건강할 수 있죠? 궁금합니다!</p>',
    category: RequestCategoryType.SPORTS_HEALTH,
    creatorId: creators[1]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 22,
    status: RequestStatusType.REQUEST,
    //solvedUrl: 'https://www.youtube.com/watch?v=FLYsar74dus',
  },
  {
    userId: users[1].id,
    title: '제 냉장고에 있는 재료로 어떤 요리를 할 수 있을까요?',
    content: '<p>뽀구미양 한번 도전해주세요. 부탁합니다.</p>',
    category: RequestCategoryType.COOK_EAT,
    creatorId: creators[4]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 10,
    status: RequestStatusType.REFUSE,
    refusalReason:
      '요즘 너무 바빠서... 그리고 제가 요리를 못해서 요거는 못할것 같아요!',
  },
  {
    userId: users[4].id,
    title: '뉴진스의 V로그를 보고 싶어요!',
    content: '<p>상어송을 불러주실 수 있나요?</p>',
    category: RequestCategoryType.ENTERTAINMENT,
    creatorId: creators[5]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 16,
    status: RequestStatusType.EXPIRATION,
    //solvedUrl: 'https://www.youtube.com/watch?v=FLYsar74dus',
  },
  {
    userId: users[2].id,
    title: '그것을 알려드림은 요즘 안하나요..?',
    content:
      '<p>제 최애 콘텐츠인데... 궁금합니다.<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu9UcsojZb0ei1-IyZEtByVNtRp3hAdGxEXw&usqp=CAU"/></p>',
    category: RequestCategoryType.ETC,
    creatorId: creators[2]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 1123,
    status: RequestStatusType.COMPLETION,
    solvedUrl: 'https://www.youtube.com/watch?v=fJ6ryDCQzaU',
  },
  {
    userId: users[0].id,
    title: '영화 범죄도시2 리뷰 부탁드려요~',
    content:
      '<p>리뷰가 궁금합니다. plz...<img src="https://images.unsplash.com/photo-1660632031387-760ced651717?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4016&q=80"/></p>',
    category: RequestCategoryType.COOK_EAT,
    creatorId: creators[2]?.id,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 1004,
    status: RequestStatusType.COMPLETION,
    solvedUrl: 'https://www.youtube.com/watch?v=J9h2jwn36zs',
  },
  {
    userId: users[6].id,
    title: '아무나 BBQ 신메뉴 먹방 부탁드려요!',
    content: '<p>비비큐는 내 삶의 에너지...</p>',
    category: RequestCategoryType.COOK_EAT,
    //creatorId: 3,
    expires: new Date(now.setFullYear(now.getFullYear() + 1)),
    totalViews: 153,
    status: RequestStatusType.REQUEST,
    // solvedUrl: 'https://www.youtube.com/watch?v=fJ6ryDCQzaU',
  },
];

// 요청 지원자 목록
export const requestApplyCreators = (creators: Creator[]) => [
  {
    requestId: 6,
    creatorId: creators[0]!.id,
  },
  {
    requestId: 6,
    creatorId: creators[1]!.id,
  },
  {
    requestId: 6,
    creatorId: creators[3]!.id,
  },
];

// 요청 플랫폼
export const requestPlatforms = [
  {
    requestId: 1,
    name: RequestPlatformType.FACEBOOK,
  },
  {
    requestId: 1,
    name: RequestPlatformType.INSTAGRAM,
  },
  {
    requestId: 2,
    name: RequestPlatformType.YOUTUBE,
  },
  {
    requestId: 3,
    name: RequestPlatformType.YOUTUBE,
  },
  {
    requestId: 3,
    name: RequestPlatformType.TWITCH,
  },
  {
    requestId: 4,
    name: RequestPlatformType.YOUTUBE,
  },
  {
    requestId: 4,
    name: RequestPlatformType.FACEBOOK,
  },
  {
    requestId: 5,
    name: RequestPlatformType.TWITCH,
  },
  {
    requestId: 6,
    name: RequestPlatformType.INSTAGRAM,
  },
];

// 요청 후원
export const requestFundings = [
  {
    requestId: 1,
    userId: users[0].id,
    quantity: 20000,
  },
  {
    requestId: 1,
    userId: users[3].id,
    quantity: 10000,
  },
  {
    requestId: 1,
    userId: users[6].id,
    quantity: 20000,
  },
  {
    requestId: 2,
    userId: users[1].id,
    quantity: 10000,
  },
  {
    requestId: 2,
    userId: users[3].id,
    quantity: 30000,
  },
  {
    requestId: 3,
    userId: users[2].id,
    quantity: 50000,
  },
  {
    requestId: 4,
    userId: users[4].id,
    quantity: 30000,
  },
  {
    requestId: 6,
    userId: users[0].id,
    quantity: 10000,
  },
  {
    requestId: 7,
    userId: users[2].id,
    quantity: 40000,
  },
  {
    requestId: 7,
    userId: users[1].id,
    quantity: 20000,
  },
];

//1432414
// 요청 댓글
export const requestComments = [
  {
    requestId: 1,
    userId: users[0].id,
    content: '많은 관심 부탁드려요!!!!',
  },
  {
    requestId: 1,
    userId: users[1].id,
    parentId: 1,
    content: '넵, 화이팅팅팅!',
  },
  {
    requestId: 1,
    userId: users[4].id,
    parentId: 1,
    content: '후원했어요!!!!',
  },
  {
    requestId: 1,
    userId: users[3].id,
    content: '기대됩니다!!!',
  },
  {
    requestId: 2,
    userId: users[0].id,
    content: '이 요청은 조용하군요!',
  },
  {
    requestId: 3,
    userId: users[0].id,
    content: '재밌는 요청이네요!',
  },
  {
    requestId: 4,
    userId: users[1].id,
    content: '세상에 이런 요청이?!!!',
  },
  {
    requestId: 5,
    userId: users[2].id,
    content:
      '멋집니다용!! 그레이트!! 그레이트!! 멋집니다용!! 그레이트!! 그레이트!! 멋집니다용!! 그레이트!! 그레이트!! 멋집니다용!! 그레이트!! 그레이트!! 멋집니다용!! 그레이트!! 그레이트!!',
  },
  {
    requestId: 6,
    userId: users[6].id,
    content: '탐나는 요청이군요!! 매우 부럽습니다.',
  },
  {
    requestId: 7,
    userId: users[4].id,
    content: '그레이트!! 그레이트!!',
  },
];

// id          BigInt      @id @default(autoincrement()) @database.BigInt
//   request     RequestPost @relation(fields: [requestId], references: [id], onDelete: Cascade)
//   requestId   BigInt
//   user        User?        @relation(fields: [userId], references: [id], onDelete: SetNull)
//   userId      String?
//   content     String      @database.LongText
//   type        RequestReportType
//   status      RequestReportStatus
//   createdAt   DateTime    @default(now())

// 요청 신고
export const requestReports = [
  {
    requestId: 1,
    userId: users[1].id,
    content: '불건전합니다... 매우!! 불건전해요!',
    type: RequestReportType.SEXUAL,
    status: RequestReportStatus.PROCESSING,
  },
  {
    requestId: 4,
    userId: users[2].id,
    content: '폭력적이에요.. 너무 폭력적이에요!!',
    type: RequestReportType.TERRORISM,
    status: RequestReportStatus.PROCESSING,
  },
];

// 요청 반응
export const requestReactions = [
  {
    requestId: 1,
    userId: users[2].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 1,
    userId: users[0].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 1,
    userId: users[1].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 1,
    userId: users[4].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 1,
    userId: users[5].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 1,
    userId: users[6].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 2,
    userId: users[0].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 2,
    userId: users[2].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 3,
    userId: users[3].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 3,
    userId: users[4].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 4,
    userId: users[5].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 4,
    userId: users[6].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 4,
    userId: users[7].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 5,
    userId: users[3].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 5,
    userId: users[2].id,
    type: ReactionType.DISLIKE,
  },
  {
    requestId: 6,
    userId: users[0].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 6,
    userId: users[1].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 7,
    userId: users[2].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 7,
    userId: users[3].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 7,
    userId: users[4].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 7,
    userId: users[5].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 7,
    userId: users[6].id,
    type: ReactionType.LIKE,
  },
  {
    requestId: 7,
    userId: users[7].id,
    type: ReactionType.LIKE,
  },
];

// 요청 북마크
// export const requestBookmarks = [{}];
// 요청 문의하기
// export const requestInquirys = [{}];
