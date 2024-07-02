import { Result } from 'oxide.ts';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

export interface SearchTermCachePort {
  execute(): Promise<TSearchTermAdapterRes>;
}
export type TSearchTermAdapterRes = Result<string[], KeywordsNotFoundError>;
