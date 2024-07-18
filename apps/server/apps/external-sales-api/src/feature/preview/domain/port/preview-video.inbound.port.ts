import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { TPreviewVideo, zReviewVideoResponse } from '@dothis/dto';
import { PreviewVideoParam } from '@ExternalApps/feature/preview/application/dto/preview-video.dto';

export class PreviewVideoRes extends createZodDto(
  extendApi(zReviewVideoResponse),
) {}
export class PreviewVideoDto extends PreviewVideoParam {
  constructor(props: PreviewVideoParam) {
    super();
    Object.assign(this, props);
  }
}
export interface previewVideoInboundPort {
  execute(dto: PreviewVideoDto): Promise<void>;
}
