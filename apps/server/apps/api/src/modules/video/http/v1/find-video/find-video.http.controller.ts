import { Controller } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { apiRouter } from '@dothis/dto';
import {
  nestControllerContract,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { IFindManyVideoResult } from '@Apps/modules/video/interfaces/find-many-video.interface';
import { VideoRes, IRes } from '@Libs/commons/src/interfaces/types/res.types';
import { SearchRelationVideoDto } from '@Apps/modules/video/application/dtos/find-videos.dtos';
import { match } from 'oxide.ts';
const c = nestControllerContract(apiRouter.video);
type RequestShapes = NestRequestShapes<typeof c>;
const { getVideoTest } = c;
const { summary, responses, description } = getVideoTest;

@ApiTags('이그나이트')
@Controller()
export class FindVideoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 입력 : 탐색어 only, 탐색어+연관어
   * 검색 : video type, 제목+태그에서 입력키워드 검색
   * 출력 : video 튜플
   */

  @ApiQuery({
    name: 'search',
    required: true,
    description: '탐색어',
    example: '한소희',
  })
  @ApiQuery({
    name: 'related',
    required: false,
    description: '연관어',
    example: '영화',
  })
  @ApiQuery({
    name: 'to',
    required: false,
    description: '끝 날짜',
    example: '2023-10-23',
  })
  @ApiQuery({
    name: 'from',
    required: false,
    description: '시작 날짜',
    example: '2023-10-10',
  })
  @TsRest(getVideoTest)
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse()
  async execute(
    @TsRestRequest()
    { query }: RequestShapes['getVideoTest'],
  ): Promise<IRes<IFindManyVideoResult[]>> {
    const dto = new SearchRelationVideoDto({ ...query });
    const res = await this.queryBus.execute(dto);

    return match(res, { Ok: (res) => ({ success: true, data: res }) });
  }
}
