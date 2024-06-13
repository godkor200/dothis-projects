import { ExceptionBase } from '@Libs/commons/src/exceptions/exception.base';

export class RankingRelatedWordErrors extends ExceptionBase {
  static readonly message = "Can't find a related word ranking in CashMemory";

  public readonly code = 'RANKING_RELATED_WORDS.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(RankingRelatedWordErrors.message, undefined, metadata);
  }
}
