import { QueryBus } from '@nestjs/cqrs';
import { FindDicTermQuery } from '@Apps/modules/related-word/application/dtos/find-dic-term.query';
import { Controller, Query } from '@nestjs/common';
import { FindSearchTermRes } from '@Apps/modules/related-word/domain/ports/find-search-term.res';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { apiRouter } from '@dothis/dto';
import { nestControllerContract, TsRest } from '@ts-rest/nest';
const { getDicTerm } = nestControllerContract(apiRouter.relatedWords);
const { description, summary, responses } = getDicTerm;

@ApiTags('탐색어')
@Controller()
export class FindSearchTermHttpController {
  constructor(private readonly queryBus: QueryBus) {}
  @ApiOkResponse({ description: responses[200] })
  @ApiQuery({ name: 'key', examples: { key: { value: 'dic-term' } } })
  @ApiOperation({ summary, description })
  @TsRest(getDicTerm)
  async handler(
    @Query() queryParams: FindDicTermQuery,
  ): Promise<FindSearchTermRes> {
    const query = new FindDicTermQuery({
      ...queryParams,
    });
    return await this.queryBus.execute(query);
  }
}
