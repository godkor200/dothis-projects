import {
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Param, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  FindAccumulateVideo,
  FindAccumulateVideosDtos,
} from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { IRes } from '@Libs/commons/src/types/res.types';
import { match, Result } from 'oxide.ts';
import {
  IFindAccumulateVideoRes,
  ISection,
} from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { JwtAccessGuard, User } from '@Libs/commons/src';
import { UserInfoCommandDto } from '@Apps/common/auth/commands/v1/google-login-redirect/google-login-redirect.service';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
const c = nestControllerContract(apiRouter.video);
const { summary, responses, description } = c.getAccVideo;

@ApiTags('영상')
@Controller()
export class FindAccumulateVideosHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @UseGuards(JwtAccessGuard)
  @ApiParam({
    name: 'clusterNumber',
    description: '클러스터 번호, 탐색어를 찾을때 클러스터 번호가 표기됩니다.',
    example: 0,
  })
  @ApiQuery({
    name: 'keyword',
    description: '탐색어',
    example: '이태원',
  })
  @ApiQuery({
    name: 'relationKeyword',
    description: '연관어, 연관어가 없다면 없어도됩니다.',
    example: '클라스',
  })
  @ApiQuery({
    name: 'from',
    description: '언제부터 날짜',
    example: '2023-10-11',
  })
  @ApiQuery({
    name: 'to',
    description: '까지 날짜',
    example: '2023-10-17',
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
  @TsRest(c.getAccVideo)
  async execute(
    @Param('clusterNumber') clusterNumber: string,
    @User() userInfo: UserInfoCommandDto,
    @Query() query: FindAccumulateVideo,
  ): Promise<IRes<ISection[]>> {
    const arg = new FindAccumulateVideosDtos({
      clusterNumber,
      ...query,
      user: userInfo,
    });

    const result: Result<
      IFindAccumulateVideoRes<ISection[]>,
      any
    > = await this.queryBus.execute(arg);

    return match(result, {
      Ok: (result) => ({ success: true, data: result }),
      Err: (err: Error) => {
        throw err;
      },
    });
  }
}
