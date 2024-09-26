import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zChannelAnalysisBody } from '@dothis/dto';
import { zSuccessBase } from '@dothis/dto';

export class RegisterChannelBody extends createZodDto(
  extendApi(zChannelAnalysisBody),
) {
  constructor(props: RegisterChannelBody) {
    super();
    Object.assign(this, props);
  }
}
export class RegisterChannelDto {
  registeredChannelId: string;
  userId: number;
  constructor(props: RegisterChannelDto) {
    this.registeredChannelId = props.registeredChannelId;
    this.userId = props.userId;
  }
}
export class ChannelAnalysisResp extends createZodDto(
  extendApi(zSuccessBase),
) {}
