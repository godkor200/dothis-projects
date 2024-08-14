import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAutoCompleteWordsCommandDto } from '@Apps/modules/related-word/application/dtos/auto-complete-words.dto';
import { Inject } from '@nestjs/common';
import {
  GET_SEARCH_WORD_DI_TOKEN,
  KOREAN_AUTO_COMPLETE_DI_TOKEN,
} from '@Apps/modules/related-word/related-words.enum.di-token.constant';

import { SearchTermCachePort } from '@Apps/modules/related-word/infrastructure/repositories/cache/search-term.cache.port';
import { KoreanAutocompleteCachePort } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache.port';

@CommandHandler(UpdateAutoCompleteWordsCommandDto)
export class UpdateAutoCompleteWordsCommandHandler
  implements ICommandHandler<UpdateAutoCompleteWordsCommandDto>
{
  constructor(
    @Inject(GET_SEARCH_WORD_DI_TOKEN)
    private readonly searchTermCache: SearchTermCachePort,

    @Inject(KOREAN_AUTO_COMPLETE_DI_TOKEN)
    private readonly koreanAutocompleteCache: KoreanAutocompleteCachePort,
  ) {}

  async execute(command: UpdateAutoCompleteWordsCommandDto): Promise<boolean> {
    const searchTerm = await this.searchTermCache.execute();
    try {
      if (searchTerm.isOk()) {
        const searchTermUnwrapped = searchTerm.unwrap();
        const res =
          await this.koreanAutocompleteCache.addWords(searchTermUnwrapped);
        console.log(`Search result: ${res}`);
        return true;
      }
      return searchTerm.isErr();
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
