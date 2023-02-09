import { Controller, HttpStatus, Param } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindUserCommand } from '@Apps/api/src/user/v1/commands/get-user/get-user.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/types/dto.types';
import {
  nestControllerContract,
  TsRest,
  NestRequestShapes,
} from '@ts-rest/nest';
import { userApi } from '@dothis/share/lib/dto/user/user.api';

const c = nestControllerContract(userApi);
type RequestShapes = NestRequestShapes<typeof c>;
@ApiTags('user')
@Controller()
export class GetUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.getUser)
  @ApiOperation({ summary: '유저를 가져옵니다.' })
  @ApiResponse({
    description: '유저 찾아옵니다.',
    status: HttpStatus.OK,
    type: [UserDto],
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not Found',
  })
  @ApiInternalServerErrorResponse({
    description: '서버에 문제가 있으면 리턴한다.',
  })
  async getUser(@Param('id') id: RequestShapes['getUser']) {
    const command = new FindUserCommand({ userId: id.toString() });
    const res = await this.commandBus.execute(command);
    return res;
  }
}
