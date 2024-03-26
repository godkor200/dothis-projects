import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KeywordQueryDto } from '@Apps/modules/related-word/interfaces/http/queries/v1/find-search-keyword/find-search-keyword.http.controller';
import { Err, Ok, Result } from 'oxide.ts';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { FindRelatedWordOutboundPort } from '@Apps/modules/related-word/domain/ports/find-related-word.outbound.port';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

@QueryHandler(KeywordQueryDto)
export class FindSearchKeywordQueryHandler
  implements
    IQueryHandler<KeywordQueryDto, Result<string[], KeywordsNotFoundError>>
{
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly relWordsRepository: FindRelatedWordOutboundPort,
  ) {}

  async execute(
    query: KeywordQueryDto,
  ): Promise<Result<string[], KeywordsNotFoundError>> {
    const res = await this.relWordsRepository.findAllKeyword();
    if (!res) return Err(new KeywordsNotFoundError());
    return Ok(res.map((e) => e.keyword));
  }
}
