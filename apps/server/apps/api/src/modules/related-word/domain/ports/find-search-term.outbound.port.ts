import { FindDicTermQuery } from '@Apps/modules/related-word/application/dtos/find-dic-term.query';
import { FindSearchTermRes } from '@Apps/modules/related-word/domain/ports/find-search-term.res';

export interface FindSearchTermOutboundPort {
  findAll: (options: FindDicTermQuery) => Promise<FindSearchTermRes>;
}
