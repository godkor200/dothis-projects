import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { zUserModel } from '@dothis/dto';
import { IQuery } from '@nestjs/cqrs';

export class GetOwnInfoOutboundPort extends createZodDto(
  extendApi(zUserModel),
) {}

export class GetOwnInfoQuery implements IQuery {
  readonly index: string;

  constructor(props: GetOwnInfoQuery) {
    Object.assign(this, props);
  }
}

export interface IDecodeToken {
  id: number;
  userEmail: string;
  iat: number;
  exp: number;
}
