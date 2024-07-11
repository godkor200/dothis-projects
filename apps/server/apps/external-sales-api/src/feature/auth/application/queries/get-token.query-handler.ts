import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { GET_TOKEN_SERVICE_TOKEN } from '@ExternalApps/feature/auth/auth.di-token';
import { GetTokenInboundPort } from '@ExternalApps/feature/auth/domain/port/get-token.inbound.port';
import { GetTokenDto } from '@ExternalApps/feature/auth/application/dtos/get-token.dto';
import { UnauthorizedErr } from '@Apps/common/auth/domain/event/auth.error';

export type GetTokenRes = Result<
  {
    accessToken: string;
  },
  UnauthorizedErr
>;

@QueryHandler(GetTokenDto)
export class GetTokenQueryHandler
  implements IQueryHandler<GetTokenDto, GetTokenRes>
{
  constructor(
    @Inject(GET_TOKEN_SERVICE_TOKEN)
    private readonly getTokenService: GetTokenInboundPort,
  ) {}
  async execute(query: GetTokenDto): Promise<GetTokenRes> {
    return this.getTokenService.execute(query);
  }
}
