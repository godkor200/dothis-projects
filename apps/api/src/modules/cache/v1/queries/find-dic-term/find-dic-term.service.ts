import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { FindDicTermRes } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.res';
import { Inject } from '@nestjs/common';
import { CACHE_FIND_ALL_QUERY } from '@Apps/modules/cache/constants/cache.contants';
import { DicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/dic-term.query';

@QueryHandler(FindDicTermQuery)
export class FindDicTermService
  implements IQueryHandler<FindDicTermQuery, FindDicTermRes>
{
  @Inject(CACHE_FIND_ALL_QUERY) private readonly query: DicTermQuery;
  execute(query: FindDicTermQuery): Promise<FindDicTermRes> {
    return this.query.findAll(query);
  }
}
