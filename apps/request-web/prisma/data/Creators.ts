import { AuthPlatformType } from '@prisma/client';

import { users } from './Users';

/***********
 model Creator {
    id              BigInt          @id @default(autoincrement()) @db.BigInt
    user            User            @relation(fields: [userId], references: [id], onDelete: Cascade)
    userId          String          @unique
    createdAt       DateTime        @default(now())
    requestPosts    RequestPost[]
    requestApplyCreators RequestApplyCreator[]   
    requestInquiries    RequestInquiry[]
    creatorAuths    CreatorAuth[]
    creatorReviews  CreatorReview[]
  
    @@index([userId, createdAt(sort: Desc)])
    @@map("creators")
}
 ***********/

export const creators = [
  {
    userId: users[4].id,
  },
  {
    userId: users[5].id,
  },
  {
    userId: users[6].id,
  },
  {
    userId: users[7].id,
  },
  {
    userId: users[8].id,
  },
  {
    userId: users[9].id,
  },
] as const;

export const creatorAuths = [
  {
    creatorId: 1,
    isMain: true,
    profileUrl: 'https://www.youtube.com/c/%EB%BD%80%EA%B5%AC%EB%AF%B8',
    platform: AuthPlatformType.YOUTUBE,
  },
  {
    creatorId: 2,
    isMain: true,
    profileUrl: 'https://www.youtube.com/channel/UCdtRAcd3L_UpV4tMXCw63NQ',
    platform: AuthPlatformType.YOUTUBE,
  },
  {
    creatorId: 3,
    isMain: true,
    profileUrl: 'https://www.youtube.com/c/%EC%A7%84%EC%9A%A9%EC%A7%84',
    platform: AuthPlatformType.YOUTUBE,
  },
  {
    creatorId: 4,
    isMain: true,
    profileUrl: 'https://www.youtube.com/c/SKTT1Faker_official',
    platform: AuthPlatformType.YOUTUBE,
  },
  {
    creatorId: 5,
    isMain: true,
    profileUrl: 'https://www.youtube.com/user/zilioner83',
    platform: AuthPlatformType.YOUTUBE,
  },
  {
    creatorId: 6,
    isMain: true,
    profileUrl: 'https://www.youtube.com/channel/UCMki_UkHb4qSc0qyEcOHHJw',
    platform: AuthPlatformType.YOUTUBE,
  },
];
