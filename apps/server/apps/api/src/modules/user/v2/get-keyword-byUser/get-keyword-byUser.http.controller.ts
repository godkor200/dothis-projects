import {
  Controller,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindKeywordTagByUserCommand } from 'apps/api/src/modules/user/v2/get-keyword-byUser/get-keyword-byUser.service';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from '@Libs/commons/src/types/dto.types';
import {
  nestControllerContract,
  TsRest,
  NestRequestShapes,
} from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/v1/commands/google-login-redirect/google-login-redirect.service';
const c = nestControllerContract(apiRouter.user);
const { pathParams, summary, responses, description } = c.getUserKeyword;
type RequestShapes = NestRequestShapes<typeof c>;
@ApiTags(pathParams)
@Controller()
export class GetKeywordByUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @TsRest(c.getUserKeyword)
  @UseGuards(JwtAccessGuard)
  @ApiOperation({
    summary,
    description,
  })
  @ApiOkResponse({
    description: '유저의 태그나 키워드를 찾아 옵니다.',
    type: UserDto,
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async getKeywordTag(@User() userInfo: UserInfoCommandDto) {
    const command = new FindKeywordTagByUserCommand({
      userId: userInfo.id,
    });
    return await this.commandBus.execute(command);
  }
}
