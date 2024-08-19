import { Result } from 'oxide.ts';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { incrementScoreWordsDto } from '@Apps/modules/related-word/application/dtos/auto-complete-words.dto';
import { Inject } from '@nestjs/common';
import { KOREAN_AUTO_COMPLETE_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { KoreanAutocompleteCachePort } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache.port';

export type TIncrementScoreResult = Result<boolean, any>;
@CommandHandler(incrementScoreWordsDto)
export class IncrementScoreService
  implements ICommandHandler<incrementScoreWordsDto, TIncrementScoreResult>
{
  constructor(
    @Inject(KOREAN_AUTO_COMPLETE_DI_TOKEN)
    private readonly koreanAutocompleteCache: KoreanAutocompleteCachePort,
  ) {}
  async execute(
    command: incrementScoreWordsDto,
  ): Promise<TIncrementScoreResult> {
    const res = await this.koreanAutocompleteCache.incrementScore(command.word);
    return Promise.resolve(res);
  }
}
