import { z } from 'zod';
import { zRequestVideoSchema } from '../video';
import { zSuccessBase } from '../../lib';
import { itemObject } from '../common.zod';

const {
  users_client_id,
  video_id,
  shortform_id,
  manager_id,
  operator_id,
  vod_id,
  webhook_url,
  token,
} = zRequestVideoSchema.shape;

export const zRequestVideoBody = z.object({
  clientId: users_client_id,
  managerId: manager_id,
  operatorId: operator_id,
  vodId: vod_id,
  shortformId: shortform_id,
  videoUrl: video_id,
  webhookUrl: webhook_url,
  token,
});
// zDeleteVideoParam 정의
export const zDeleteVideoParam = z.object({
  videoId: zRequestVideoBody.shape.videoUrl,
});
export const zPostStoryBoardQuery = z.object({
  clientId: z.string(),
  vodId: zRequestVideoBody.shape.vodId,
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
    .describe('동영상의 URL'),
});

export const zCommentVideoResParam = zPreviewVideoResParam;

export const zReqVideoListObject = z.object({
  items: z.array(zRequestVideoBody.omit({ token: true })),
});
export const zResponsePreviewVideoObject = z.object({
  items: z.array(zPreviewVideo),
});
export const zReqVideoList = zReqVideoListObject.shape.items;
export const zGetReqVideoList = zSuccessBase.merge(
  itemObject(zReqVideoListObject),
);
export const zReviewVideoResponse = zSuccessBase.merge(
  itemObject(zResponsePreviewVideoObject),
);

export const zVideoCommentRequestSchema = z
  .object({
    order: z
      .enum(['0', '1'])
      .default('0')
      .optional()
      .describe('optional, 기본값은 0 (0:최신순,1:인기 댓글순)'),
    replies: z
      .enum(['0', '1'])
      .default('0')
      .optional()
      .describe('optional, 기본값은 0 (0:대댓글 불포함)"'),
    maxResults: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(20)
      .optional()
      .describe('maxResults는 1~100 범위의 옵션이며 기본값은 20'),
    pageToken: z
      .string()
      .optional()
      .describe(
        'pageToken이 다음 페이지로 이동하기 위한 정보, 값을 nextPageToken 다음에 검색할 수 있는 결과의 다음 페이지를 식별',
      ),
  })
  .strict();

/**
 * video comments schema
 */
const SnippetSchema = z.object({
  channelId: z.string(),
  videoId: z.string(),
  textDisplay: z.string(),
  textOriginal: z.string(),
  authorDisplayName: z.string(),
  authorProfileImageUrl: z.string().url(),
  authorChannelUrl: z.string().url(),
  authorChannelId: z.object({
    value: z.string(),
  }),
  canRate: z.boolean(),
  viewerRating: z.string(),
  likeCount: z.number(),
  publishedAt: z.string(), // Should be date-time but kept as string for simplicity
  updatedAt: z.string(), // Should be date-time but kept as string for simplicity
});

// Define the Comment schema
const CommentSchema = z.object({
  id: z.string(),
  snippet: SnippetSchema,
});

// Define the Replies schema
const RepliesSchema = z.object({
  comments: z.array(CommentSchema),
});

// Define the Item schema
export const zItemSchema = z.object({
  id: z.string(),
  snippet: SnippetSchema,
  replies: RepliesSchema.optional(),
});

// Define the PageInfo schema
export const zPageInfoSchema = z.object({
  totalResults: z.number(),
  resultsPerPage: z.number(),
});

// Define the main schema
export const zVideoCommentResponse = z.object({
  pageInfo: zPageInfoSchema,
  nextPageToken: z.string(),
  type: z.literal('youtube'), // Literal type for 'youtube'
  items: z.array(zItemSchema),
});
export const zGetVideoComments = zSuccessBase.merge(
  itemObject(zVideoCommentResponse),
);
/**
 * video comments schema
 */
export type TGetVideoComments = z.TypeOf<typeof zGetVideoComments>;
export type TPreviewVideo = z.TypeOf<typeof zPreviewVideo>;
export type TRequestVideoModel = z.TypeOf<typeof zRequestVideoSchema>;
