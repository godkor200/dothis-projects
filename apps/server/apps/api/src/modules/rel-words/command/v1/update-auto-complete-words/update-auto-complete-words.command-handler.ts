import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateAutoCompleteWordsCommandDto } from '@Apps/modules/rel-words/interface/dtos/auto-complete-words.dto';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { RelatedWordsRepositoryPort } from '@Apps/modules/rel-words/repository/db/rel-words.repository.port';
import { FindRelCachePort } from '@Apps/modules/rel-words/repository/cache/find-rel.cache.port';

@CommandHandler(UpdateAutoCompleteWordsCommandDto)
export class UpdateAutoCompleteWordsCommandHandler
  implements ICommandHandler<UpdateAutoCompleteWordsCommandDto>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: RelatedWordsRepositoryPort,

    @Inject(RELWORDS_DI_TOKEN.FIND_ONE_BY_ELASTICACHE)
    private readonly relWordsCache: FindRelCachePort,
  ) {}

  async execute(command: UpdateAutoCompleteWordsCommandDto): Promise<boolean> {
    const res: { keyword: string }[] =
      await this.relWordsRepository.findAllKeyword();

    const autoCompleteWords = res.map((e) => e.keyword);

    return await this.relWordsCache.setAutoCompleteWord(autoCompleteWords);
  }
}
