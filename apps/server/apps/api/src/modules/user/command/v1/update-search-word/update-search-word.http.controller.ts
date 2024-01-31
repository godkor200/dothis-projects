import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeaders,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { UpdateSearchWordDto } from '@Apps/modules/user/dtos/update-search-word.dto';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
import { match, Result } from 'oxide.ts';
const c = nestControllerContract(apiRouter.user);
const { putSearchWord } = c;
const { responses, description, summary } = putSearchWord;

@Controller()
@ApiTags('유저 관련')
export class UpdateSearchWordHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(putSearchWord)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @ApiBody({
    isArray: true,
    type: 'string',
    description: "['먹방', '카페', 'ASMR', '여행', '제주도']",
    required: true,
  })
  @ApiOkResponse({
    description: '성공여부를 리턴합니다.',
  })
  @ApiBearerAuth('Authorization')
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  async execute(
    @User() user: UserInfoCommandDto,
    @Body('searchWord') searchWord: string[],
  ): Promise<IRes<void>> {
    const arg = new UpdateSearchWordDto({ id: user.id, searchWord });

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
