import { AlarmStatusType } from '@prisma/client';
import { users } from "./Users";

/********
id          BigInt      @id @default(autoincrement()) @db.BigInt
  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  content     String      @db.Text
  link        String?     @db.VarChar(200)
  status      AlarmStatusType      @default(UNREAD)
  createdAt   DateTime    @default(now())
 ********/

export const alarms = [
  {
    userId: users[0].id,
    content: '작성하신 요청을 크리에이터가 완료했습니다.',
    link: 'https://dachata.com',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId:users[1].id,
    content: '띵동!2222 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[2].id,
    content: '띵동!3333 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[1].id,
    content: '띵동!4444 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[4].id,
    content: '후원하신 요청이 완료됐습니다.',
    link: 'https://dachata.com',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[3].id,
    content: 'XX님의 생일을 진심으로 축하합니다!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[2].id,
    content: '띵동! 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[1].id,
    content: 'XX님의 생일을 진심으로 축하합니다!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId:users[6].id,
    content: '띵동! 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[8].id,
    content: 'XX님의 생일을 진심으로 축하합니다!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[9].id,
    content: '띵동! 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[3].id,
    content: 'XX님의 생일을 진심으로 축하합니다!',
    status: AlarmStatusType.UNREAD,
  },
  {
    userId: users[0].id,
    content: '띵동! 배달왔습니다! 문앞에 두고 갈게요!',
    status: AlarmStatusType.UNREAD,
  },
];
