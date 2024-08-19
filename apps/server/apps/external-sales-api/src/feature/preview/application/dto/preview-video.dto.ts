import { zPreviewVideoResParam, zReviewVideoResponse } from '@dothis/dto';
import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';

export class PreviewVideoParam extends createZodDto(
  extendApi(zPreviewVideoResParam),
) {}
export class ReviewVideoResponse extends createZodDto(
  extendApi(zReviewVideoResponse),
) {}
