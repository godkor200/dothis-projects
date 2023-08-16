import {
  ApiBearerAuth,
  ApiHeaders,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Controller, HttpStatus, UseGuards } from '@nestjs/common';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { JwtAccessGuard, TDecodePayload, User } from '@Libs/commons/src';
import { QueryBus } from '@nestjs/cqrs';
import { GetOwnInfoQuery } from '@Apps/common/auth/interface/get-own-info.interface';
const { getOwnInfo } = nestControllerContract(apiRouter.auth);
import { User as UserEntity } from '@Apps/modules/user/domain/user.entity';
import { UserRes } from '@Libs/commons/src/types/dto.types';

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
  async execute(@User() user: TDecodePayload): Promise<UserEntity> {
    const query = new GetOwnInfoQuery({ index: user.id });
    return this.queryBus.execute(query);
  }
}
