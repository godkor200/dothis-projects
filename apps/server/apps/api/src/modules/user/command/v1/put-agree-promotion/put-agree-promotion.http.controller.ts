import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { IRes } from '@Libs/commons/src/types/res.types';
import {
  ApiBody,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PutAgreePromotionDtos } from '@Apps/modules/user/dtos/put-agree-promotion.dtos';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { match, Result } from 'oxide.ts';
const c = nestControllerContract(apiRouter.user);
const { putAgreePromotion } = c;
const { responses, description, summary } = putAgreePromotion;
@Controller()
@ApiTags('유저 관련')
export class PutAgreePromotionHttpController {
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
  @ApiBody({
    isArray: false,
    type: Boolean,
    description: '동의여부, {isAgree: boolean}',
    required: true,
  })
  @ApiOkResponse({
    description: '성공여부를 리턴합니다.',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[404],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  @TsRest(c.putAgreePromotion)
  async execute(
    @Body('isAgree') isAgree: boolean,
    @User() user: UserInfoCommandDto,
  ): Promise<IRes<void>> {
    const arg = new PutAgreePromotionDtos({ isAgree, id: user.id });
    const result: Result<boolean, NotFoundException> =
      await this.commandBus.execute(arg);
    return match(result, {
      Ok: (result) => ({ success: result }),
      Err: (err) => {
        if (err instanceof InternalServerErrorException) {
          throw new InternalServerErrorException();
        }
        throw err;
      },
    });
  }
}
