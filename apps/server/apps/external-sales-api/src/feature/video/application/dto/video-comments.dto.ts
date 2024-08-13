import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zCommentVideoResParam, zVideoCommentRequestSchema } from '@dothis/dto';

export class VideoCommentsQuery extends createZodDto(
  extendApi(zVideoCommentRequestSchema),
) {}
export class VideoCommentsParam extends createZodDto(
  extendApi(zCommentVideoResParam),
) {}

export class VideoCommentsDto {
  videoUrl: string;
  order: '0' | '1'; // order는 옵션이며 기본값은 0 (최신순) 1 (인기 댓글순)
  replies: '0' | '1'; // replies는 옵션이며 기본값은 0 (대댓글 불포함)
  maxResults: number; // maxResults는1~100 범위의 옵션이며 기본값은 20
  pageToken?: string; // pageToken은 옵션

  constructor(
    videoCommentsParam: VideoCommentsParam,
    videoCommentsQuery: VideoCommentsQuery,
  ) {
    // 필요 시 추가 매핑 로직을 포함할 수 있습니다.
    this.videoUrl = videoCommentsParam.videoUrl;
    this.order = videoCommentsQuery.order || '0'; // 기본값 적용
    this.replies = videoCommentsQuery.replies || '0'; // 기본값 적용
    this.maxResults = videoCommentsQuery.maxResults || 20; // 기본값 적용
    this.pageToken = videoCommentsQuery.pageToken;
  }
}
