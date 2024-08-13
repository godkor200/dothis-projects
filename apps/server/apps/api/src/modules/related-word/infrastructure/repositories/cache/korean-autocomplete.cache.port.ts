import { TIncrementScoreResult } from '@Apps/modules/related-word/application/service/increment-score.service';

export interface KoreanAutocompleteCachePort {
  addWords(words: string[]): Promise<void>;

  search(query: string): Promise<string[]>;

  incrementScore(keyword: string): Promise<TIncrementScoreResult>;
}
