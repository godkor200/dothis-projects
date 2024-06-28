import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import * as Hangul from 'hangul-js';
import { KoreanAutocompleteCachePort } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache.port';

export class KoreanAutocompleteCache implements KoreanAutocompleteCachePort {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  private decompose(word: string): string {
    return Hangul.d(word).join('');
  }

  private async createIndex() {
    await this.redisClient.call(
      'FT.CREATE',
      'korean',
      'ON',
      'HASH',
      'PREFIX',
      '1',
      'word:',
      'SCHEMA',
      'content',
      'TEXT',
      'decomposed',
      'TEXT',
    );
  }

  private async addWord(word: string) {
    const decomposedWord = this.decompose(word);
    console.log(decomposedWord);
    await this.redisClient.hset(
      `word:${word}`,
      'content',
      word,
      'decomposed',
      decomposedWord,
    );
  }
  async addWords(words: string[]): Promise<void> {
    await this.createIndex();
    for (const word of words) {
      await this.addWord(word);
    }
  }

  async search(query: string): Promise<string[]> {
    const decomposedQuery = this.decompose(query);
    const result = (await this.redisClient.call(
      'FT.SEARCH',
      'korean',
      decomposedQuery,
    )) as any[];
    return result.slice(2).filter((_, index) => index % 2 === 0);
  }
}
