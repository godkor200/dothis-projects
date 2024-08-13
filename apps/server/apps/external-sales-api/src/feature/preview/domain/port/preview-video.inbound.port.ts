import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { TVideoVideoResponse, zReviewVideoResponse } from '@dothis/dto';
import { PreviewVideoParam } from '@ExternalApps/feature/preview/application/dto/preview-video.dto';
import { Result } from 'oxide.ts';
import {
  InvalidYoutubeUrlException,
  VideoNotFoundException,
} from '@ExternalApps/feature/crawl-queue/video/domain/events/errors/video.error';

export type TPreviewVideoOmitRes = Omit<
  TVideoVideoResponse,
  'clientId' | 'vodId' | 'shortformId' | 'operatorId' | 'managerId'
>;

export class PreviewVideoRes extends createZodDto(
  extendApi(zReviewVideoResponse),
) {}

export type TPreviewVideoRes = Result<
  TPreviewVideoOmitRes,
  VideoNotFoundException | InvalidYoutubeUrlException
>;
export class PreviewVideoDto extends PreviewVideoParam {
  constructor(props: PreviewVideoParam) {
    super();
    Object.assign(this, props);
  }
}
export interface previewVideoInboundPort {
  execute(dto: PreviewVideoDto): Promise<void>;
}
