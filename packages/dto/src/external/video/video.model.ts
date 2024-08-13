import { z } from 'zod';
import { maxLengthWarning } from '../../lib/error.response.zod';
// JWT 형태를 검증하는 Regex (형태가 맞는지)
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

export const zRequestVideoSchema = z.object({
  user_id: z.string().max(20).describe('우리 고유 클라이언트 아이디'),
  users_client_id: z
    .string()
    .max(20, maxLengthWarning(20))
    .describe('고객사에 가입된 사용자의 ID (우리의 고객사 ID와 구분됨)'),
  video_id: z.string().max(48, maxLengthWarning(48)),
  is_shorts: z.boolean().default(false).describe('0: shorts, 1: video'),
  manager_id: z.string().max(30).optional().describe('관리자 식별 아이디'),
  operator_id: z.string().max(30).optional().describe('운영자 식별 아이디'),
  vod_id: z.string().max(30).describe('라이브러리 식별 아이디'),
  shortform_id: z.string().max(30).describe('숏폼 식별 아이디'),
  is_Shorts: z.boolean().describe('0: public, 1: private'),
  is_keep_crawling: z
    .boolean()
    .default(true)
    .describe('1: 크롤링 유지, 0: 크롤링 중단'),
  is_need_crawling: z
    .boolean()
    .default(true)
    .describe('1: video_data로 crawling 필요, 0: 이미 수집 완료'),
  is_bad_video: z
    .boolean()
    .default(false)
    .describe('1: 시청 불가, 0: 시청(크롤링) 가능'),
  webhook_url: z.string().max(100).nullable().describe('웹훅 URL'),
  update_date: z.date().nullable().describe('업데이트 날짜'),
  token: z
    .string()
    .describe('상대측 토큰')
    .refine((token) => jwtRegex.test(token), {
      message: 'Invalid JWT format', // 형태 검증 실패 시 메시지
    })
    .refine((token) => token.length > 10, {
      // 최소 길이 검증
      message: 'JWT token is too short', // 길이 검증 실패 시 메시지
    }),
});
export const zVideoDataShortsSchema = z.object({
  videoId: z.string().max(11),
  year: z.number().int().min(2000).default(2000),
  month: z.number().int().min(1).max(12).default(1),
  day: z.number().int().min(1).max(31).default(1),
  channelId: z.string().max(52),
  videoTitle: z.string().max(2000).nullable(),
  videoDescription: z.string().nullable(),
  videoTags: z.string().max(4000).nullable(),
  videoDuration: z.number().int().min(0).default(0).nullable(),
  videoPublished: z.date().nullable(),
  videoCategory: z.string().max(50).default(''),
  videoInfoCard: z.number().int().max(1).nullable(),
  videoWithAds: z.number().int().max(1).nullable(),
  videoEndScreen: z.number().int().max(1).nullable(),
  videoCluster: z.number().int().nullable(),
  crawledDate: z.date().nullable(),
});

export const zPostQueueVideoResponse = z.object({
  clientId: z.string(),
  vodId: z.string(),
  shortformId: z.string(),
  managerId: z.string().optional(),
  operatorId: z.string().optional(),
  videoUrl: z.string(),
  videoId: z.string(),
  type: z.literal('youtube'),
  title: z.string(),
  desc: z.string(),
  tags: z.array(z.string()),
  counter: z.object({
    joinCount: z.number(),
    likeCount: z.number(),
    commentCount: z.number(),
    subscribeCount: z.number(),
  }),
  categories: z.string(),
  duration: z.number(),
  thumbnailUrl: z.string(),
  creators: z.object({
    name: z.string(),
    channelId: z.string(),
    profileUrl: z.string(),
  }),
  uploadAt: z.string(),
  updatedAt: z.string(),
  isDel: z.boolean().default(false),
  Stats: z
    .object({
      joinCount: z.number(),
      likeCount: z.number(),
      commentCount: z.number(),
      subscribeCount: z.number(),
    })
    .optional(),
});
export type TVideoVideoResponse = z.TypeOf<typeof zPostQueueVideoResponse>;
export type videoDetailSchema = z.TypeOf<typeof zVideoDataShortsSchema>;
