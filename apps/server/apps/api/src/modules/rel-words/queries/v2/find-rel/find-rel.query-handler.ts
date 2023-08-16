import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelQuery } from '@Apps/modules/rel-words/queries/dtos/find-rel.dto';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { FindRelCachePort } from '@Apps/modules/rel-words/repository/cache/find-rel.cache.port';

@QueryHandler(FindRelQuery)
export class FindRelQueryHandler
  implements IQueryHandler<FindRelQuery, string>
{
  @Inject(RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE) query: FindRelCachePort;
  execute(query: FindRelQuery): Promise<string> {
    return this.query.findOneRelWord(query.keyword);
  }
}
