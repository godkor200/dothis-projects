import { Body, Controller, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiBody,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/types/dto.types';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IResDto } from '@Libs/commons/src/types/res.types';
import { UpdatePersonalTagDto } from '@Apps/modules/user/dtos/update-personal-tag.dto';
import { JwtAccessGuard } from '@Libs/commons/src';
const c = nestControllerContract(apiRouter.user);

const { putUpdatePersonalTag } = c;
const { responses, description, summary } = putUpdatePersonalTag;

@Controller()
@ApiTags('유저 관련')
export class UpdatePersonalTagHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(putUpdatePersonalTag)
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
    isArray: true,
    type: 'string',
    description: "['먹방#', '카페#', 'ASMR', '여행', '제주도']",
    required: true,
  })
  @ApiOkResponse({
    description: '성공여부를 리턴합니다.',
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(
    @Req() req,
    @Body('tag') tag: string[],
  ): Promise<IResDto<void>> {
    const arg = new UpdatePersonalTagDto({ id: req.user.id, tag });
    if (await this.commandBus.execute(arg)) return { success: true };
  }
}
