import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zChannelAnalysisBody,
  zGetRegisterChannelIdQuery,
  zRegisterChannelListResponseObject,
} from '@dothis/dto';
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

// GET DTO 및 쿼리 클래스 정의
export class GetRegisteredChannelQuery extends createZodDto(
  extendApi(zGetRegisterChannelIdQuery),
) {
  constructor(props: GetRegisteredChannelQuery) {
    super();
    Object.assign(this, props);
  }
}

export class GetRegisteredChannelDto {
  userId: number;

  constructor(props: GetRegisteredChannelDto) {
    this.userId = props.userId;
  }
}

export class GetRegisteredChannelRes extends createZodDto(
  extendApi(zRegisterChannelListResponseObject),
) {}
