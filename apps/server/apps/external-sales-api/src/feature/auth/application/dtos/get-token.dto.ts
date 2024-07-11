import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zAuthRes, zGetAuthParams } from '@dothis/dto';

export class GetTokenParams extends createZodDto(extendApi(zGetAuthParams)) {}
export class GetTokenResponse extends createZodDto(extendApi(zAuthRes)) {}

export class GetTokenDto extends GetTokenParams {
  constructor(props: GetTokenParams) {
    super();
    Object.assign(this, props);
  }
}
