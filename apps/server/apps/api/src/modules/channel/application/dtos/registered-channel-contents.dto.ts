import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import {
  zGetContentListQuery,
  zRegisteredChannelContentsResp,
  zRegisteredChannelContentsResponse,
} from '@dothis/dto';

export class RegisteredChannelContentsQuery extends createZodDto(
  extendApi(zGetContentListQuery),
) {
  constructor(props: RegisteredChannelContentsQuery) {
    super();
    Object.assign(this, props);
  }
}

export class RegisteredChannelContentsDto extends RegisteredChannelContentsQuery {
  constructor(props: RegisteredChannelContentsQuery) {
    super(props);
    Object.assign(this, props);
  }
}
export class RegisteredChannelContentsRes extends createZodDto(
  extendApi(zRegisteredChannelContentsResponse),
) {}

export class RegisteredChannelContentsResSingle extends createZodDto(
  extendApi(zRegisteredChannelContentsResp),
) {}
