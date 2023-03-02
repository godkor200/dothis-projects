import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { DicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/dic-term.query';
import { FindDicTermRes } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.res';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from "@nestjs/common";

@Injectable()
export class FindDicTermImplement implements DicTermQuery {
  private readonly redisClient: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }
  findAll(options: FindDicTermQuery): Promise<FindDicTermRes> {
    return this.redisClient.hgetall(options.key);
  }
}
