import type { RequestPost } from '@prisma/client';
import { Prisma, RequestCategoryType, RequestStatusType } from '@prisma/client';
import { z } from 'zod';

import CreatorDomain from '@/domain/CreatorDomain';
import UserDomain from '@/domain/UserDomain';
import type { AwaitedReturn } from '@/types/utils';
import { youtubeUrlToId } from '@/utils/appUtils';
import { strictlyOnlyRecordKey } from '@/utils/common';
import { iterableToEnum } from '@/utils/zodUtils';

import requestPostDB from './requestPost.db';

type Domain = RequestPost;

const _categoryKor = new Map<RequestCategoryType, string>([
  ['GAME', '게임'],
  ['LIFE_TALK', '일상/토크'],
  ['COOK_EAT', '요리/먹방'],
  ['TOUR_FOOD', '여행/맛집'],
  ['DANCE_MUSIC', '댄스/음악'],
  ['ENTERTAINMENT', '엔터테인먼트'],
  ['EDUCATION', '교육/강의'],
  ['FINANCE', '경제/금융'],
  ['SPORTS_HEALTH', '스포츠/헬스'],
  ['BEAUTY_FASHION', '뷰티/패션'],
  ['HOBBY', '취미'],
  ['ETC', '기타'],
]);

export const requestPostSchema = z.object({
  id: z.bigint(),
  createAt: z.date(),
  updateAt: z.date(),
  userId: UserDomain.schema.shape.id.nullish(),
  creatorId: CreatorDomain.schema.shape.id.nullish(),
  title: z
    .string()
    .min(6, { message: '제목을 최소 6자 이상 작성해주세요.' })
    .max(100, { message: '제목은 최대 100자까지 가능합니다.' }),
  content: z.string(),
  totalViews: z.number(),
  status: z.nativeEnum(RequestStatusType),
  category: z.nativeEnum(RequestCategoryType).nullish(),
  expires: z.date().nullish(), // 요청 만료일
  solvedUrl: z
    .string()
    .refine((url) => !!youtubeUrlToId(url), {
      message: '콘텐츠 url을 다시 확인해주세요.',
    })
    .nullish(),
  refusalReason: z.string().nullish(),
  thumbnailUrl: z.string().nullish(),
});

namespace RequestPostDomain {
  export type GetItemDetailT = Awaited<ReturnType<typeof db.getDetailItem>>;
  export type GetItemT = AwaitedReturn<typeof db.getItems>[number];

  export const schema = requestPostSchema;

  export const constants = {
    maxContentsLength: 3000,
    maxImageFileSize: 5 * 1024 * 1024,
    maxThumbnailWidth: 160,
    maxThumbnailHeight: 160,
    requestCategoryType: RequestCategoryType,
    requestStatusType: RequestStatusType,

    categoryFilter: new Map<'ALL' | RequestCategoryType, string>([
      ['ALL', '카테고리 전체'],
      ..._categoryKor,
    ]),
    requestFilter: new Map<'ALL' | 'ING' | 'RESOLVED', string>([
      ['ALL', '전체 요청'],
      ['ING', '새요청만'],
      ['RESOLVED', '해결된 요청'],
    ]),

    order: new Map<'LATEST' | 'RECOMMEND' | 'PAY', string>([
      ['LATEST', '최신순'],
      ['RECOMMEND', '추천순'],
      ['PAY', '후원금순'],
    ]),

    categoryKor: _categoryKor,

    statusTypeKor: new Map<RequestStatusType, string>([
      ['REQUEST', '요청'], // 요청 상태
      ['ACCEPT', '수락'], // 크리에이터가 요청을 수락하거나, 지원한 크리에이터들 중 선정이 완료된 경우
      ['REGISTRATION', '등록'], // 크레에이터가 등록을 한 상태 (MVP 이후에서는 완료와 등록 사이에 검토 과정 추가 예정)
      ['COMPLETION', '해결'], // 요청 콘텐츠가 해결된 상태 (MVP에서는 크리에이터가 콘텐츠를 등록하면 완료)
      ['EXPIRATION', '만료'], // 기간이 지나서 요청이 만료된 상태
      ['REFUSE', '거절'], // 멘션된 크리에이터가 거절을 한 상태
    ]),

    showStatusTypeKor: new Map<RequestStatusType, string>([
      ['REQUEST', '새 요청'],
      ['ACCEPT', '진행 중'],
      ['REGISTRATION', '진행 중'],
      ['COMPLETION', '해결'],
      ['EXPIRATION', '만료'],
      ['REFUSE', '거절'],
    ]),

    statusStep: new Map<RequestStatusType, 0 | 1 | 2 | 3 | 4>([
      ['REQUEST', 1],
      ['ACCEPT', 2],
      ['REGISTRATION', 3],
      ['COMPLETION', 4],
      ['EXPIRATION', 0],
      ['REFUSE', 0],
    ]),
  } as const;

  export const filterSchema = z.object({
    categoryFilter: iterableToEnum(
      RequestPostDomain.constants.categoryFilter.keys(),
    ).optional(),
    requestFilter: iterableToEnum(
      RequestPostDomain.constants.requestFilter.keys(),
    ).optional(),
    order: iterableToEnum(RequestPostDomain.constants.order.keys()).optional(),
  });

  export const db = requestPostDB;
}

export default RequestPostDomain;
