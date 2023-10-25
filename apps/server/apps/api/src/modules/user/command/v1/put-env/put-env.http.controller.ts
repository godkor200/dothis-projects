import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { IsAdminGuard } from '@Libs/commons/src/oauth/guards/is-admin.guard';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { PutEnvDtos } from '@Apps/modules/user/dtos/put-env.dtos';
import { match, Result } from 'oxide.ts';
import {
  ApiBody,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
const c = nestControllerContract(apiRouter.user);
const { putAdminUserEnv } = c;
const { responses, description, summary } = putAdminUserEnv;
@Controller()
export class PutEnvHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAccessGuard, IsAdminGuard)
  @TsRest(putAdminUserEnv)
  @ApiOperation({
    summary,
    description,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiBody({
    isArray: false,
    type: Boolean,
    description: '리다이렉션 환경, {isEnvLocal: boolean}',
    required: true,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[404],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(
    @User() user: UserInfoCommandDto,
    @Body('isEnvLocal') isEnvLocal: boolean,
  ) {
    const arg = new PutEnvDtos({
      id: user.id,
      isEnvLocal,
    });

    const result: Result<boolean, InternalServerErrorException> =
      await this.commandBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err: Error) => {
        if (err instanceof InternalServerErrorException)
          throw new InternalServerErrorException(err.message);
        throw err;
      },
    });
  }
}
