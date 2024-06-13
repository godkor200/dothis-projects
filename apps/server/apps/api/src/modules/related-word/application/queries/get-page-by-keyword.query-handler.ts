import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPageByKeywordDto } from '@Apps/modules/related-word/application/dtos/get-page-by-keyword.dto';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';
import { Result } from 'oxide.ts';
import { GET_PAGE_BY_KEYWORD_SERVICE } from '@Apps/modules/related-word/keyword.di-token.constant';
import { Inject } from '@nestjs/common';
import { GetPageByKeywordInboundPort } from '@Apps/modules/related-word/domain/ports/get-page-by-keyword.inbound.port';

export type GetPageByKeywordResult = Result<Boolean, KeywordsNotFoundError>;

@QueryHandler(GetPageByKeywordDto)
export class GetPageByKeywordQueryHandler
  implements IQueryHandler<GetPageByKeywordDto, GetPageByKeywordResult>
{
  constructor(
    @Inject(GET_PAGE_BY_KEYWORD_SERVICE)
    private readonly keywordService: GetPageByKeywordInboundPort,
  ) {}

  async execute(dto: GetPageByKeywordDto): Promise<GetPageByKeywordResult> {
    return await this.keywordService.execute(dto);
  }
}
