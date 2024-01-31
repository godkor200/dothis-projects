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
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import { IFindManyVideoResult } from '@Apps/modules/video/interfaces/find-many-video.interface';
import { VideoRes, IRes } from '@Libs/commons/src/interfaces/types/res.types';

const c = nestControllerContract(apiRouter.video);
type RequestShapes = NestRequestShapes<typeof c>;
const { getVideoTest } = c;
const { summary, responses, description } = getVideoTest;

@ApiTags('이그나이트')
@Controller()
export class FindVideoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 입력 : 탐색어only, 탐색어+연관어
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
  @TsRest(getVideoTest)
  @ApiOkResponse({ type: VideoRes })
  @ApiNotFoundResponse()
  async execute(
    @TsRestRequest()
    { query: { search, related } }: RequestShapes['getVideoTest'],
  ): Promise<IRes<IFindManyVideoResult[]>> {
    const query = new FindVideoQuery({ search, related });
    console.log(query);
    return await this.queryBus.execute(query);
  }
}
