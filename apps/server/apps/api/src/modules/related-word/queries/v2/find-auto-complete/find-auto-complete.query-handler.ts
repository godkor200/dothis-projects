import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAutoCompleteWordsCommandDto } from '@Apps/modules/related-word/application/dtos/auto-complete-words.dto';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/rel-words.enum.di-token.constant';
import { FindRelCachePort } from '@Apps/modules/related-word/repository/cache/find-rel.cache.port';

@QueryHandler(FindAutoCompleteWordsCommandDto)
export class FindAutoCompleteQueryHandler
  implements IQueryHandler<FindAutoCompleteWordsCommandDto, string[]>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE)
    protected readonly relCache: FindRelCachePort,
  ) {}
  async execute(arg: FindAutoCompleteWordsCommandDto): Promise<string[]> {
    return await this.relCache.findAutoCompleteWords(arg.words);
  }
}
