import { FindDicTermQuery } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { FindDicTermRes } from 'apps/api/src/modules/cache/v1/queries/find-dic-term/find-dic-term.res';

export interface FindDicTermAdapter {
  findAll: (options: FindDicTermQuery) => Promise<FindDicTermRes>;
}
