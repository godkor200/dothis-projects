import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { FindDicTermRes } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.res';

export interface DicTermQuery {
  findAll: (options: FindDicTermQuery) => Promise<FindDicTermRes>;
}
