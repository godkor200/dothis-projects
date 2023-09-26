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
import {
  Controller,
  HttpStatus,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, TDecodePayload, User } from '@Libs/commons/src';
import { QueryBus } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interface/get-own-info.interface';
const { getOwnInfo } = nestControllerContract(apiRouter.auth);
import { User as UserEntity } from '@Apps/modules/user/domain/user.entity';
import { UserRes } from '@Libs/commons/src/types/dto.types';
import { match, Result } from 'oxide.ts';
import { IRes } from '@Libs/commons/src/types/res.types';
import { UserNotFoundError } from '@Apps/common/auth/domain/event/auth.error';
const { summary, description } = getOwnInfo;

@ApiTags('유저 인증')
@Controller()
export class GetOwnInfoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getOwnInfo)
  @UseGuards(JwtAccessGuard)
  @ApiOkResponse({
    description: '유저의 정보를 찾아 옵니다.',
    type: UserRes,
  })
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
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: getOwnInfo.responses[404],
  })
  @ApiUnauthorizedResponse({ description: 'Authentication failed' })
  @ApiInternalServerErrorResponse({
    description: getOwnInfo.responses[500],
  })
  @ApiBearerAuth('Authorization')
  async execute(@User() user: TDecodePayload): Promise<IRes<UserEntity>> {
    const query = new GetOwnInfoQuery({ index: user.id });

    const result: Result<UserEntity, NotFoundException> =
      await this.queryBus.execute(query);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        if (err instanceof NotFoundException) {
          throw new UserNotFoundError();
        }
        throw err;
      },
    });
  }
}
