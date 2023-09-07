import { Controller, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindRelRequestDto } from './find-rel.request.dto';
import { apiRouter } from '@dothis/dto';
import { TsRest, nestControllerContract } from '@ts-rest/nest';
const c = nestControllerContract(apiRouter.relwords);
const { getRelWords } = c;
const { responses, description, summary } = getRelWords;
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FindRelV1Query } from '@Apps/modules/rel-words/interface/dtos/find-rel.dto';

@ApiTags('연관어')
@ApiCookieAuth()
@Controller()
export class FindRelHttpController {
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
    description: `데이터를 보냅니다.`,
  })
  @ApiConflictResponse({
    description: responses[401],
  })
  @ApiNotFoundResponse({
    description: responses[404],
  })
  @ApiInternalServerErrorResponse({
    description: responses[500],
  })
  async execute(@Param() queryParams: FindRelRequestDto) {
    return await this.queryBus.execute(new FindRelV1Query(queryParams));
  }
}
