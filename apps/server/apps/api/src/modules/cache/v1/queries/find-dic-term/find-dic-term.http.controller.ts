import { QueryBus } from '@nestjs/cqrs';
import { FindDicTermQuery } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { Controller, Query } from '@nestjs/common';
import { FindDicTermRes } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.res';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { apiRouter, cacheBaseApiUrl } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
const { get } = nestControllerContract(apiRouter.cache);
const { description, summary, responses } = get;

@ApiTags('탐색어 관련')
@Controller()
export class FindDicTermHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @ApiOkResponse({ description: responses[200] })
  @ApiQuery({ name: 'key', examples: { key: { value: 'dic-term' } } })
  @ApiOperation({ summary, description })
  @TsRest(get)
  async handler(
    @Query() queryParams: FindDicTermQuery,
  ): Promise<FindDicTermRes> {
    const query = new FindDicTermQuery({
      ...queryParams,
    });
    return await this.queryBus.execute(query);
  }
}
