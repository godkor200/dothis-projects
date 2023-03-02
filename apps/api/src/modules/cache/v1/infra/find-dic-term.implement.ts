import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { DicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/dic-term.query';
import { FindDicTermRes } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.res';
import { Redis } from 'ioredis';
import { QueryHandler } from '@nestjs/cqrs';

export class FindDicTermImplement implements DicTermQuery {
  private readonly redisClient: Redis;
  findAll(options: FindDicTermQuery): Promise<any> {
    return this.redisClient.hgetall(options.key);
  }
}
