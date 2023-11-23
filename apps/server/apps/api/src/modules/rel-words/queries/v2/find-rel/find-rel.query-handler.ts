import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRelV2Query } from '@Apps/modules/rel-words/interface/dtos/find-rel.dto';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { FindRelCachePort } from '@Apps/modules/rel-words/repository/cache/find-rel.cache.port';

@QueryHandler(FindRelV2Query)
export class FindRelQueryHandler
  implements IQueryHandler<FindRelV2Query, string>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE)
    protected readonly relCache: FindRelCachePort,
  ) {}
  async execute(query: FindRelV2Query): Promise<string> {
    return await this.relCache.findOneRelWord(query.keyword);
  }
}
