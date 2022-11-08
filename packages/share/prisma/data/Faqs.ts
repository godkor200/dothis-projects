/**************
id          Int         @id @default(autoincrement())
type        FaqType
title       String      @db.VarChar(255)
content     String      @db.LongText
createdAt   DateTime    @default(now())
**************/
import { FaqType } from '@prisma/client';

export const faqs = [
  {
    type: FaqType.ACCOUNT,
    title: '계정 정보를 분실했어요!',
    content:
      '두디스는 소셜 로그인 기능만을 제공하고 있습니다. 사용하신 계정은 두디스에 최초 회원가입한 소셜 플랫폼에서 찾으셔야 합니다.',
  },
  {
    type: FaqType.ACCOUNT,
    title: '계정 설정이 초기화 됐어요',
    content:
      '두디스는 고객님의 회원정보를 임의로 수정하지 않습니다. 만약, 회원정보가 변경됐다면 고객센터를 통해 문의해주세요.',
  },
  {
    type: FaqType.BEST,
    title: '원하는 크리에이터가 없어요!',
    content:
      '두디스에서는 크리에이터를 모으기 위해 오늘도 열심히 고군분투하고 있습니다. 조금만 더 기다려주세요.',
  },
  {
    type: FaqType.BEST,
    title: '크리에이터가 자꾸 거절해요',
    content:
      '크리에이터 콘텐츠의 컨셉에 맞지 않거나, 요청 내용에 문제가 있을 경우 거절될 수 있습니다. 요청 내용을 다시 한번 확인해주세요.',
  },
  {
    type: FaqType.BUSSINESS,
    title: '두디스와 제휴를 맺고 싶어요.',
    content:
      '사이트 하단의 주소 또는 전화번호를 통해 연락주세요. 두디스는 여러분의 관심을 환영합니다.',
  },
  {
    type: FaqType.CREATOR,
    title: '크리에이터 인증이 안돼요',
    content:
      '인증 과정에서 문제가 되는 부분을 고객센터에 이미지 형태로 첨부해서 문의 부탁드립니다.',
  },
  {
    type: FaqType.CREATOR,
    title: '후원금을 빼고 싶어요.',
    content: '후원금은 XXX포인트가 넘어야지 인출이 가능합니다.',
  },
  {
    type: FaqType.GUIDE,
    title: '크리에이터한테 후원하고 싶어요.',
    content:
      '요청 콘텐츠를 작성하고 원하시는 크리에이터를 멘션하세요. 다른 사용자들이 후원에 동참할 수 있습니다.',
  },
];
