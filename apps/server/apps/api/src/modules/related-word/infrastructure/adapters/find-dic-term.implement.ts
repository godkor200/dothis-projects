import { FindDicTermQuery } from '@Apps/modules/related-word/application/dtos/find-dic-term.query';
import { FindSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/find-search-term.outbound.port';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { FindSearchTermRes } from '@Apps/modules/related-word/domain/ports/find-search-term.res';

@Injectable()
export class FindDicTermImplement implements FindSearchTermOutboundPort {
  constructor(@InjectRedis() private readonly redisClient: Redis) {} // Redis client with 'master2' namespace) {}

  findAll(options: FindDicTermQuery): Promise<FindSearchTermRes> {
    return this.redisClient.hgetall(options.key);
  }
}
