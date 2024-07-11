import { GetTokenParams } from '@ExternalApps/feature/auth/application/dtos/get-token.dto';
import { GetTokenRes } from '@ExternalApps/feature/auth/application/queries/get-token.query-handler';

export interface GetTokenInboundPort {
  execute(dto: GetTokenParams): Promise<GetTokenRes>;
}
