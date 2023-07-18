import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { apiRouter } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { ApiTags } from '@nestjs/swagger';
import { FindVideoQuery } from '@Apps/modules/video/v1/find-video/find-video.service';
const c = nestControllerContract(apiRouter.video);
const { pathParams, summary, responses, description } = c.getVideo;

@ApiTags(pathParams)
@Controller()
export class FindVideoHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 입력 : 탐색어only, 탐색어+연관어
   * 검색 : video type, 제목+태그에서 입력키워드 검색
   * 출력 : video 튜플
   */
  @TsRest(c.getVideo)
  @Get()
  async execute(
    @Query('search') search: string,
    @Query('related') related: string,
  ) {
    const query = new FindVideoQuery({ search, related });
    return await this.queryBus.execute(query);
  }
}
