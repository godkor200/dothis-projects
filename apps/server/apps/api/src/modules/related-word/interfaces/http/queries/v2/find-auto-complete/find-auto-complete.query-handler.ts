import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAutoCompleteWordsCommandDto } from '@Apps/modules/related-word/application/dtos/auto-complete-words.dto';
import { Inject } from '@nestjs/common';
import { KOREAN_AUTO_COMPLETE_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { KoreanAutocompleteCachePort } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache.port';

@QueryHandler(FindAutoCompleteWordsCommandDto)
export class FindAutoCompleteQueryHandler
  implements IQueryHandler<FindAutoCompleteWordsCommandDto, string[]>
{
  constructor(
    @Inject(KOREAN_AUTO_COMPLETE_DI_TOKEN)
    private readonly koreanAutocompleteCache: KoreanAutocompleteCachePort,
  ) {}
  async execute(arg: FindAutoCompleteWordsCommandDto): Promise<string[]> {
    return await this.koreanAutocompleteCache.search(arg.words);
  }
}
