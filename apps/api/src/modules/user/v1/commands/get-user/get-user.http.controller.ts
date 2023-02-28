import { Controller, HttpStatus, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindUserCommand } from '@Apps/modules/user/v1/commands/get-user/get-user.service';
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
import { userApi } from '@dothis/dto/lib';

const c = nestControllerContract(userApi);
const { getUser } = c;
const { pathParams, summary, responses, description } = getUser;
type RequestShapes = NestRequestShapes<typeof c>;
@ApiTags(pathParams)
@Controller()
export class GetUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(getUser)
  @ApiParam({ name: 'id', required: true, description: '유저 아이디' })
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: '유저 찾아옵니다.',
    type: [UserDto],
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async getUser(@Param('id') id: RequestShapes['getUser']) {
    const command = new FindUserCommand({ userId: id.toString() });
    const res = await this.commandBus.execute(command);
    return res;
  }
}
