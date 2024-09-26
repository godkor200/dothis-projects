import { Redis } from 'ioredis';
import { DailyViewCachePort } from '@Apps/modules/hits/domain/ports/daily-view.cache.port';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { IIncreaseHitsData } from '@Apps/modules/hits/application/types/daily-hits.res-types';
import { IIncreaseDailyViews } from '@Apps/modules/video/application/service/helpers/video.aggregate.type';

import { Err, Ok, Result } from 'oxide.ts';
import { VideoCacheNotFoundError } from '@Apps/modules/hits/domain/events/errors/weekly-views.error';

export type TDailyHitsResult = Result<
  IIncreaseHitsData[],
  VideoCacheNotFoundError
>;

export type TGetDailyHitsKeysResult = Result<string[], VideoCacheNotFoundError>;

export class DailyViewsCache implements DailyViewCachePort {
  constructor(
    @InjectRedis('onPromise_node_2') private readonly redisClient: Redis,
  ) {}

  async saveRangeDataForDailyHits(
    keyword: string,
    item: IIncreaseDailyViews,
    related?: string,
  ): Promise<void> {
    const key = related
      ? `daily-hits:${keyword}:${related}`
      : `daily-hits:${keyword}`;

    for (const data of item.data) {
      await this.redisClient.hset(key, data.date, JSON.stringify(data));
      console.log(`${key} Data for date ${data.date} stored.`);
    }
  }

  async updateOrAddDataForDailyHits(
    keyword: string,
    additionalItem: IIncreaseDailyViews,
  ): Promise<void> {
    const key = `daily-hits:${keyword}`;
    const data = additionalItem.data;
    for (const item of data) {
      await this.redisClient.hset(
        key,
        item.date,
        JSON.stringify({ status: 'updated', ...item }),
      );
      console.log(`${key} Data for date ${item.date} Updated or added data`);
    }
  }

  async getDataForDailyHits(
    keyword: string,
    date: string,
    related?: string,
  ): Promise<TDailyHitsResult> {
    try {
      const key = related
        ? `daily-hits:${keyword}:${related}`
        : `daily-hits:${keyword}`;

      const res = await this.redisClient.hget(key, date);
      if (res) {
        const parsed = JSON.parse(res);
        return Ok(parsed.data); // 적절한 필드로 반환
      }
      return Err(new VideoCacheNotFoundError());
    } catch (e) {
      return Err(e);
    }
  }

  async getDataForDailyHitsInRange(
    keyword: string,
    from: string,
    to: string,
    related?: string,
  ): Promise<TDailyHitsResult> {
    try {
      const key = related
        ? `daily-hits:${keyword}:${related}`
        : `daily-hits:${keyword}`;

      const fromDate = new Date(from);
      const toDate = new Date(to);

      // 날짜를 포맷해서 각 날짜의 필드를 구함
      const dateFields = [];
      for (let d = fromDate; d <= toDate; d.setDate(d.getDate() + 1)) {
        dateFields.push(d.toISOString().split('T')[0]); // 날짜 형식 YYYY-MM-DD
      }

      // Redis Multi를 사용하여 여러 작업을 병행
      const values = await this.redisClient.hmget(key, ...dateFields);

      if (values.length > 0) {
        return Ok(values.map((item) => JSON.parse(item)));
      }

      return Err(new VideoCacheNotFoundError());
    } catch (e) {
      return Err(e);
    }
  }
  async getKeys(part: string): Promise<TGetDailyHitsKeysResult> {
    const keys: string[] = [];
    const pattern = `*${part}*`; // part를 포함한 모든 키 검색
    let cursor = '0';
    try {
      do {
        const [nextCursor, foundKeys] = await this.redisClient.scan(
          cursor,
          'MATCH',
          pattern,
          'COUNT',
          100,
        );
        cursor = nextCursor;
        keys.push(...foundKeys);
      } while (cursor !== '0');
      console.log(keys);
      return Ok(keys);
    } catch (e) {
      return Err(e);
    }
  }
}
