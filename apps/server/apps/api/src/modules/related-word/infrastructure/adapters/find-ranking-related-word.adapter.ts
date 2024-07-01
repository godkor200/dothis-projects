import {
  FindRankingRelatedWordDao,
  FindRankingRelatedWordOutboundPort,
  FindRankingRelatedWordOutboundPortRes,
} from '@Apps/modules/related-word/domain/ports/find-ranking-related-word.outbound.port';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { Err, Ok } from 'oxide.ts';
import { RankingRelatedWordErrors } from '@Apps/modules/related-word/domain/errors/ranking-related-word.errors';
import { RelatedWordMapper } from '@Apps/modules/related-word/application/mapper/related-word.mapper';
@Injectable()
export class FindRankingRelatedWordAdapter
  implements FindRankingRelatedWordOutboundPort
{
  constructor(
    @InjectRedis('ranking')
    private readonly redisClient: Redis,
  ) {}
  async execute(
    dao: FindRankingRelatedWordDao,
  ): Promise<FindRankingRelatedWordOutboundPortRes> {
    try {
      const res = await this.redisClient.zrange(dao.key, 0, -1, 'WITHSCORES');
      if (!res.length) {
        return Err(new RankingRelatedWordErrors());
      }
      return Ok(RelatedWordMapper.toObject(res));
    } catch (e) {
      return Err(e);
    }
  }
}
