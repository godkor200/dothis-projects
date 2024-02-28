import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { FindKeywordTagByUserCommand } from '@Apps/modules/user/queries/v2/get-keyword-byUser/get-keyword-byUser.service';
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
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, User } from '@Libs/commons/src';

import {
  ChannelKeywordOrtagDtos,
  ResultChannelKeywordTag,
} from '@Apps/modules/user/dtos/channel-keywordOrtag.dtos';
import { IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { ChannelNotFoundError } from '@Apps/modules/channel/domain/events/channel.errors';
import { UserInfoCommandDto } from '@Apps/common/auth/interfaces/dtos/user-info.dto';
const c = nestControllerContract(apiRouter.user);
const { summary, responses, description } = c.getUserKeyword;

@ApiTags('유저 관련')
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
    type: ChannelKeywordOrtagDtos,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: "우리 사이트 accessToken(ex:'Bearer ~~~~~~')",
    },
  ])
  @ApiUnauthorizedResponse({ description: 'Authentication failed' })
  @ApiBearerAuth('Authorization')
  async getKeywordTag(
    @User() userInfo: UserInfoCommandDto,
  ): Promise<IRes<ChannelKeywordOrtagDtos>> {
    const command = new FindKeywordTagByUserCommand({
      userId: userInfo.id.toString(),
      channelId: userInfo.channelId,
    });
    const result: Result<ResultChannelKeywordTag, ChannelNotFoundError> =
      await this.commandBus.execute(command);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof ChannelNotFoundError) {
          throw new NotFoundException(err.message);
        }
        throw err;
      },
    });
  }
}
