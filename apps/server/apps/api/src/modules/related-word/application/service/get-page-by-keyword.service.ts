import { GetPageByKeywordInboundPort } from '@Apps/modules/related-word/domain/ports/get-page-by-keyword.inbound.port';
import { RelatedWordsRepositoryPort } from '@Apps/modules/related-word/infrastructure/repositories/db/rel-words.repository.port';
import { GetPageByKeywordDto } from '@Apps/modules/related-word/application/dtos/get-page-by-keyword.dto';
import { GetPageByKeywordResult } from '@Apps/modules/related-word/application/queries/get-page-by-keyword.query-handler';
import { Inject } from '@nestjs/common';
import { RELWORDS_DI_TOKEN } from '@Apps/modules/related-word/related-words.enum.di-token.constant';
import { Err, Ok } from 'oxide.ts';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

export class GetPageByKeywordService implements GetPageByKeywordInboundPort {
  constructor(
    @Inject(RELWORDS_DI_TOKEN.FIND_ONE)
    private readonly repository: RelatedWordsRepositoryPort,
  ) {}

  async execute(query: GetPageByKeywordDto): Promise<GetPageByKeywordResult> {
    try {
      const res = await this.repository.findOneByKeyword(query.search);
      if (res.isOk()) {
        return Ok(true);
      }
      return Err(new KeywordsNotFoundError());
    } catch (e) {
      return Err(e);
    }
  }
}
