import { ApiTags } from '@nestjs/swagger';
import { Controller, Query } from '@nestjs/common';
import { IQuery, QueryBus } from '@nestjs/cqrs';
import { IRes } from '@Libs/commons/src/types/res.types';
import { IFindVideoPageQuery } from '@Libs/commons/src/types/dto.types';

@ApiTags('영상')
@Controller()
export class FindVideoPageHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  /**
   * 연관콘텐츠 영상 api
   * 입력 : 탐색어, 연관어
   * - perfomence field 기준 정렬
   * - 영상 50개까지 큐레이팅
   * - 페이지 당 5개씩 페이지네이션
   * 출력 : video_id[50] (list)
   *
   * 하단부 연관 콘텐츠 부분 유튜브 영상 나열하는데 사용
   */

  async execute(@Query() query: IFindVideoPageQuery): Promise<IRes<any>> {
    return await this.queryBus.execute(query);
  }
}
