import { Body, Controller, HttpStatus, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/types/dto.types';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { IResDto } from '@Libs/commons/src/types/res.types';
import { UpdatePersonalTagDto } from '@Apps/modules/user/dtos/update-personal-tag.dto';
const c = nestControllerContract(apiRouter.user);

const { putUpdatePersonalTag } = c;
const { responses, description, summary } = putUpdatePersonalTag;

@Controller()
export class UpdatePersonalTagHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(putUpdatePersonalTag)
  @ApiParam({ name: 'id', required: true, description: '유저 아이디' })
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: '유저 찾아옵니다.',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(
    @Param('id') id: string,
    @Body('tag') tag: string[],
  ): Promise<IResDto> {
    const arg = new UpdatePersonalTagDto({ id, tag });
    if (await this.commandBus.execute(arg)) return { success: true };
  }
}
