import { Controller, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import {
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
import { apiRouter } from '@dothis/dto';
import { FindRelRequestDto } from '@Apps/modules/rel-words/queries/v1/find-rel/find-rel.request.dto';
import { FindRelV2Query } from '@Apps/modules/rel-words/interface/dtos/find-rel.dto';
import { RelWordsEntity } from '@Libs/commons/src/interfaces/types/res.types';
const c = nestControllerContract(apiRouter.relwords);
const { getRelWords } = c;
const { responses, description, summary } = getRelWords;

@ApiTags('연관어')
@Controller()
export class FindRelHttpV2Controller {
  constructor(private readonly queryBus: QueryBus) {}

  @TsRest(getRelWords)
  @ApiOperation({
    summary,
    description,
  })
  @ApiParam({
    name: '탐색어',
  })
  @ApiOkResponse({
    description: `엘라스틱 캐시에서 연관어를 보냅니다.`,
    type: RelWordsEntity,
  })
  async execute(@Param() queryParams: FindRelRequestDto): Promise<string> {
    return await this.queryBus.execute(new FindRelV2Query(queryParams));
  }
}
