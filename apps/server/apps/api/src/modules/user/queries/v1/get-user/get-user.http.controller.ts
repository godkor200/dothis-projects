import {
  Controller,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindUserCommand } from '@Apps/modules/user/queries/v1/get-user/get-user.service';
import {
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/interfaces/types/dto.types';
import {
  nestControllerContract,
  TsRest,
  NestRequestShapes,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { match, Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
const c = nestControllerContract(apiRouter.user);
const { summary, responses, description } = c.getUser;
type RequestShapes = NestRequestShapes<typeof c>;
@ApiTags('유저 관련')
@Controller()
export class GetUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.getUser)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: description,
    type: UserDto,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async getUser(@Param('id') id: string): Promise<IRes<UserDto>> {
    const command = new FindUserCommand({
      userId: id,
    });
    const result: Result<UserDto, NotFoundException> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err) => {
        if (err instanceof UserNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
