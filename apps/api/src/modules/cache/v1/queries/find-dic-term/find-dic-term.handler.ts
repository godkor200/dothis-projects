import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('/cache')
export class FindDicTermHandler {
  constructor(private readonly queryBus: QueryBus) {}
  @Get('term')
  async handler(@Query() queryParams: FindDicTermQuery): Promise<any> {
    const query = new FindDicTermQuery({
      ...queryParams,
    });
    return await this.queryBus.execute(query);
  }
}
