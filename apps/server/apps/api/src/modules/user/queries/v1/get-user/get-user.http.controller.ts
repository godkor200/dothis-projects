import { Controller, HttpStatus, Param, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindUserCommand } from '@Apps/modules/user/queries/v1/get-user/get-user.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/types/dto.types';
import {
  nestControllerContract,
  TsRest,
  NestRequestShapes,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.user);
const { summary, responses, description } = c.getUser;
type RequestShapes = NestRequestShapes<typeof c>;
@ApiTags('유저 관련')
@Controller()
export class GetUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.getUser)
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
  async getUser(@Param('id') id: string) {
    const command = new FindUserCommand({
      userId: id.toString(),
    });
    return await this.commandBus.execute(command);
  }
}
