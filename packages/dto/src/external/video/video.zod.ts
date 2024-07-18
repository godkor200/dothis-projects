import { z } from 'zod';
import { zRequestVideoSchema } from '../video';
import { zSuccessBase } from '../../lib';

const {
  users_client_id,
  video_id,
  shortform_id,
  manager_id,
  operator_id,
  vod_id,
} = zRequestVideoSchema.shape;

export const requestVideoBody = z.object({
  clientId: users_client_id,
  videoId: video_id,
  managerId: manager_id,
  operatorId: operator_id,
  vodId: vod_id,
  shortformId: shortform_id,
});
// zDeleteVideoParam 정의
export const zDeleteVideoParam = z.object({
  videoId: requestVideoBody.shape.videoId,
});
export const zPostStoryBoardQuery = z.object({
  clientId: z.string(),
  vodId: requestVideoBody.shape.vodId,
});
export const zPreviewVideo = z.object({
  videoUrl: z.string().url().describe('동영상의 URL'),
  videoId: z.string().describe('동영상 고유 식별자'),
  type: z.literal('youtube').describe('동영상 플랫폼 유형'),
  title: z.string().describe('동영상 제목'),
  description: z.string().describe('동영상 설명'),
  tags: z.array(z.string()).describe('동영상 태그 리스트'),
  count: z
    .object({
      views: z.number().describe('조회수'),
      likes: z.number().describe('좋아요 수'),
      comment: z.number().describe('댓글 수'),
    })
    .describe('동영상 통계'),
  categories: z.string().describe('동영상 카테고리'),
  duration: z.number().describe('동영상 길이 (초 단위)'),
  published: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .describe('동영상 게시 날짜'),
  thumbnail: z.string().url().describe('동영상 썸네일 URL'),
  channel: z
    .object({
      name: z.string().describe('채널 이름'),
      channelId: z.string().describe('채널 고유 식별자'),
      subscriber: z.number().describe('구독자 수'),
      profile: z.string().url().describe('채널 프로필 이미지 URL'),
    })
    .describe('채널 정보'),
});
export const zPreviewVideoResParam = z.object({
  videoUrl: z
    .string()
    .url()
    .regex(/https:\/\/www\.youtube\.com\/.+/, 'YouTube URL이어야 합니다')
    .describe('미리보기 동영상의 URL'),
});
export const zReqVideoListObject = z.object({
  items: z.array(requestVideoBody),
});
export const zResponsePreviewVideoObject = z.object({
  items: z.array(zPreviewVideo),
});
export const zReqVideoList = zReqVideoListObject.shape.items;
export const zGetReqVideoList = zSuccessBase.merge(zReqVideoListObject);
export const zReviewVideoResponse = zSuccessBase.merge(
  zResponsePreviewVideoObject,
);
export type TPreviewVideo = z.TypeOf<typeof zPreviewVideo>;
export type TRequestVideoModel = z.TypeOf<typeof zRequestVideoSchema>;
