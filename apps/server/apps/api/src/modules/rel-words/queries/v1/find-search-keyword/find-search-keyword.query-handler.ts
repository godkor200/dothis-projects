import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KeywordQueryDto } from '@Apps/modules/rel-words/queries/v1/find-search-keyword/find-search-keyword.http.controller';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/rel-words/constants/rel-words.enum.di-token.constant';
import { FindRelAdapter } from '@Apps/modules/rel-words/interface/find-rel.adapter';
import { KeywordsNotFoundError } from '@Apps/modules/rel-words/domain/keywords.errors';

@QueryHandler(KeywordQueryDto)
export class FindSearchKeywordQueryHandler
  implements
    IQueryHandler<KeywordQueryDto, Result<string[], KeywordsNotFoundError>>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: FindRelAdapter,
  ) {}

  async execute(
    query: KeywordQueryDto,
  ): Promise<Result<string[], KeywordsNotFoundError>> {
    const res = await this.relWordsRepository.findAllKeyword();
    if (!res) return Err(new KeywordsNotFoundError());
    return Ok(res.map((e) => e.keyword));
  }
}
