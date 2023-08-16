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
import { FindRelQuery } from '@Apps/modules/rel-words/queries/dtos/find-rel.dto';
import { RelwordsRes } from '@Libs/commons/src/types/dto.types';
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
    type: RelwordsRes,
  })
  @ApiConflictResponse({
    description: responses[401],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(@Param() queryParams: FindRelRequestDto): Promise<string> {
    return await this.queryBus.execute(new FindRelQuery(queryParams));
  }
}
