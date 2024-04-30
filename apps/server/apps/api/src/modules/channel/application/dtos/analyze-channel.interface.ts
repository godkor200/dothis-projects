import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zChannelId } from '@dothis/dto';

export class ChannelIdParams extends createZodDto(extendApi(zChannelId)) {
  constructor(props: ChannelIdParams) {
    super();
  }
}
export class GetAnalyzeMyChannel extends ChannelIdParams {
  constructor(props: GetAnalyzeMyChannel) {
    super(props);
    Object.assign(this, props);
  }
}
