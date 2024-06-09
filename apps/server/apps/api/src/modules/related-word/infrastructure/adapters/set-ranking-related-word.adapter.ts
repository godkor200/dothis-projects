import { SetRankingRelatedWordOutbound } from '@Apps/modules/related-word/domain/ports/set-ranking-related-word.outbound.port';
import { TRankRes } from '@dothis/dto';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class SetRankingRelatedWordAdapter
  implements SetRankingRelatedWordOutbound
{
  constructor(
    @InjectRedis('ranking')
    private readonly redisClient: Redis,
  ) {}
  async execute(dao: TRankRes): Promise<void> {
    const key = dao.keyword;
    // 랭킹 데이터를 순회하며 sorted set에 추가합니다.
    for (const [index, value] of dao.ranking.entries()) {
      const { expectedViews, sortFigure, word } = value;
      await this.redisClient.zadd(
        key,
        sortFigure,
        `${word}:${sortFigure}:${expectedViews}`,
      );
    }
    // `expire`를 사용하여 해당 키의 TTL을 86400초(하루)로 설정
    const aDay = 24 * 60 * 60;
    await this.redisClient.expire(key, aDay);
  }
}
