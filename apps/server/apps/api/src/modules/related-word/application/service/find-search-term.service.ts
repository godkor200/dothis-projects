import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDicTermQuery } from '@Apps/modules/related-word/application/dtos/find-dic-term.query';
import { FindSearchTermRes } from '@Apps/modules/related-word/domain/ports/find-search-term.res';
import { Inject } from '@nestjs/common';
import { FindSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/find-search-term.outbound.port';
import { CACHE_FIND_ALL_QUERY } from '@Apps/modules/related-word/related-words.enum.di-token.constant';

@QueryHandler(FindDicTermQuery)
export class FindSearchTermService
  implements IQueryHandler<FindDicTermQuery, FindSearchTermRes>
{
  @Inject(CACHE_FIND_ALL_QUERY)
  private readonly query: FindSearchTermOutboundPort;
  execute(query: FindDicTermQuery): Promise<FindSearchTermRes> {
    return this.query.findAll(query);
  }
}
