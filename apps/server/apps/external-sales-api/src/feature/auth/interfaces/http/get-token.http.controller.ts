import { Controller, Param, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  GetTokenDto,
  GetTokenParams,
  GetTokenResponse,
} from '@ExternalApps/feature/auth/application/dtos/get-token.dto';
import {
  nestControllerContract,
  TsRestHandler,
  tsRestHandler,
} from '@ts-rest/nest';
import { match } from 'oxide.ts';
import { externalApiRouter, zAuthRes } from '@dothis/dto';
import {
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedErr } from '@Apps/common/auth/domain/event/auth.error';
import { InternalServerErr } from '@Apps/modules/hits/domain/events/errors/hits.errors';
const c = nestControllerContract(externalApiRouter.auth);
const getToken = c.getToken;
const { summary, description } = getToken;

@Controller()
@ApiTags('인증')
export class GetTokenHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRestHandler(getToken)
  @ApiOperation({
    summary,
    description,
  })
  @ApiInternalServerErrorResponse({
    type: InternalServerErr,
  })
  @ApiUnauthorizedResponse({ type: UnauthorizedErr })
  @ApiOkResponse({ type: GetTokenResponse })
  @ApiBearerAuth('Authorization')
  async execute(@Param() params: GetTokenParams) {
    return tsRestHandler(getToken, async ({ params }) => {
      const res = await this.queryBus.execute(new GetTokenDto(params));
      return match(res, {
        Ok: (res) => ({
          status: 200,
          body: { success: true, data: res },
        }),
        Err: (err) => {
          if (err instanceof UnauthorizedErr) {
            throw new UnauthorizedException(err.message);
          }
          throw err;
        },
      });
    });
  }
}
