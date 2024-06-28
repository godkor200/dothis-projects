import {
  SearchTermCachePort,
  TSearchTermAdapterRes,
} from '@Apps/modules/related-word/infrastructure/repositories/cache/search-term.cache.port';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Err, Ok } from 'oxide.ts';
import { KeywordsNotFoundError } from '@Apps/modules/related-word/domain/errors/keywords.errors';

export class SearchTermCache implements SearchTermCachePort {
  constructor(
    @InjectRedis('onPromise')
    private readonly redisClient: Redis,
  ) {}

  async execute(): Promise<TSearchTermAdapterRes> {
    try {
      const searchResults = await this.redisClient.keys('*');
      if (!searchResults.length) return Err(new KeywordsNotFoundError());

      return Ok(searchResults);
    } catch (e) {
      return Err(e);
    }
  }
}
