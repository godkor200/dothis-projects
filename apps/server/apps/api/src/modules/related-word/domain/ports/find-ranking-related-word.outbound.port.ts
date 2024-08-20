import { Result } from 'oxide.ts';
import { RelWordsRankingRes } from '@Libs/types';
import { RankingRelatedWordErrors } from '@Apps/modules/related-word/domain/errors/ranking-related-word.errors';

export type FindRankingRelatedWordOutboundPortRes = Result<
  RelWordsRankingRes[],
  RankingRelatedWordErrors
>;

export class FindRankingRelatedWordDao {
  key: string;
  constructor(key: string) {
    this.key = key;
  }
}

export interface FindRankingRelatedWordOutboundPort {
  execute(
    dao: FindRankingRelatedWordDao,
  ): Promise<FindRankingRelatedWordOutboundPortRes>;
}
