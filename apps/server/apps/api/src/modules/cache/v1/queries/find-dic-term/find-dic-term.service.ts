import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDicTermQuery } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { FindDicTermRes } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.res';
import { Inject } from '@nestjs/common';
import { CACHE_FIND_ALL_QUERY } from 'apps/api/src/modules/cache/constants/cache.di-token';
import { FindDicTermAdapter } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.adapter';

@QueryHandler(FindDicTermQuery)
export class FindDicTermService
  implements IQueryHandler<FindDicTermQuery, FindDicTermRes>
{
  @Inject(CACHE_FIND_ALL_QUERY) private readonly query: FindDicTermAdapter;
  execute(query: FindDicTermQuery): Promise<FindDicTermRes> {
    return this.query.findAll(query);
  }
}
