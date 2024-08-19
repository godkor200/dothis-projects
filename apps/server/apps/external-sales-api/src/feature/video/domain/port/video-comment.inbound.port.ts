import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zItemSchema,
  zPageInfoSchema,
  zVideoCommentResponse,
} from '@dothis/dto';
import { Result } from 'oxide.ts';
import { VideoNotFoundException } from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';
import { z } from 'zod';

export class VideoCommentRes extends createZodDto(
  extendApi(zVideoCommentResponse),
) {}

export type TVideoCommentRes = Result<VideoCommentRes, VideoNotFoundException>;

const YouTubeCommentThreadListResponseSchema = z.object({
  kind: z.string(),
  etag: z.string(),
  nextPageToken: z.string().nullable(),
  pageInfo: zPageInfoSchema,
  items: z.array(zItemSchema),
});

// YouTubeCommentThreadListResponseSchema를 사용하여 데이터 유효성 검사하기
export type YouTubeCommentThreadListResponse = z.infer<
  typeof YouTubeCommentThreadListResponseSchema
>;
