import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import * as Hangul from 'hangul-js';
import { KoreanAutocompleteCachePort } from '@Apps/modules/related-word/infrastructure/repositories/cache/korean-autocomplete.cache.port';
import { Ok } from 'oxide.ts';
import { TIncrementScoreResult } from '@Apps/modules/related-word/application/service/increment-score.service';

export class KoreanAutocompleteCache implements KoreanAutocompleteCachePort {
  constructor(
    @InjectRedis('onPromise_node_2') private readonly redisClient: Redis,
  ) {}

  private async addWordBatch(words: string[], score: number = 0) {
    const pipeline = this.redisClient.pipeline();
    for (const word of words) {
      for (let i = 1; i <= word.length; i++) {
        const prefix = word.slice(0, i); // 접두사 생성

        // 접두사가 한글로 시작하는지 확인
        if (/[\u3131-\uD79D]/.test(prefix[0])) {
          const initialConsonants = Hangul.disassemble(prefix).filter((char) =>
            Hangul.isConsonant(char),
          )[0];
          pipeline.zadd(`autocomplete:${initialConsonants}`, score, word);
        }

        pipeline.zadd(`autocomplete:${prefix}`, score, word);
      }
    }
    await pipeline.exec(); // 파이프라인 실행
    console.log(`Batch of ${words.length} words saved.`);
  }

  // words 데이터를 배치로 저장
  async addWords(words: string[], batchSize: number = 1000): Promise<void> {
    let savedCount = 0;
    for (let i = 0; i < words.length; i += batchSize) {
      const batch = words.slice(i, i + batchSize);
      await this.addWordBatch(batch);
      savedCount += batch.length;
      console.log(`Progress: ${savedCount}/${words.length} words saved.`);
    }
    console.log(`Finished saving ${savedCount} words.`);
  }

  async search(prefix: string, withScores = false): Promise<string[]> {
    // scores 옵션에 따라 반환 타입이 달라질 수 있으므로 기본 유형을 지정합니다.
    const results: string[] = await this.redisClient.zrevrange(
      `autocomplete:${prefix}`,
      0,
      9,
      () => (withScores ? 'WITHSCORES' : ''),
    );

    return results; // 결과를 반환
  }

  // 별도로 초성을 기반으로 검색하는 메서드 추가
  async searchByInitialConsonants(
    initial: string,
    withScores = false,
  ): Promise<string[]> {
    const results: string[] = await this.redisClient.zrange(
      `autocomplete:${initial}`,
      0,
      -1,
      () => (withScores ? 'WITHSCORES' : ''),
    );

    return results; // 초성을 기반으로한 검색 결과 반환
  }

  // 키워드의 점수를 증가시키는 메서드 추가
  async incrementScore(keyword: string): Promise<TIncrementScoreResult> {
    for (let i = 1; i <= keyword.length; i++) {
      const prefix = keyword.slice(0, i);

      if (/[\u3131-\uD79D]/.test(prefix[0])) {
        const initialConsonants = Hangul.disassemble(prefix).filter((char) =>
          Hangul.isConsonant(char),
        )[0];
        const initialConsonantsRes = await this.redisClient.zincrby(
          `autocomplete:${initialConsonants}`,
          1,
          keyword,
        );
        console.log(`Progress: ${initialConsonantsRes} words saved.`);
      }

      const prefixRes = await this.redisClient.zincrby(
        `autocomplete:${prefix}`,
        1,
        keyword,
      );
      console.log(`Progress:`, prefixRes);
    }
    console.log(`Score incremented for keyword: "${keyword}"`);
    return Ok(true);
  }
}
