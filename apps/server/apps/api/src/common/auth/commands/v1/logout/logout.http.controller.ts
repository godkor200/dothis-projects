import { CommandBus } from '@nestjs/cqrs';
import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { User } from '@Libs/commons';
import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { match, Result } from 'oxide.ts';
import { LogoutDto } from '@Apps/common/auth/commands/v1/logout/logout.command-handler';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IRes } from '@Libs/types';
import { Response } from 'express';
import { JwtAccessGuard } from '@Libs/oauth';
const c = nestControllerContract(apiRouter.auth);
const { logout } = c;
const { responses, description, summary } = logout;
@Controller()
@ApiTags('유저 관련')
export class LogoutHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(JwtAccessGuard)
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
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('Authorization')
  @TsRest(logout)
  async execute(
    @Res({ passthrough: true }) res: Response,
    @User() user: UserInfoCommandDto,
  ): Promise<IRes<void>> {
    const arg = new LogoutDto({ id: user.id });
    const result: Result<boolean, NotFoundException> =
      await this.commandBus.execute(arg);

    return match(result, {
      Ok: (result) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return { success: result };
      },
      Err: (err) => {
        if (err instanceof InternalServerErrorException) {
          throw new InternalServerErrorException();
        }
        throw err;
      },
    });
  }
}
