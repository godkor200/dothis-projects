import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@QueryHandler(FindDicTermQuery)
export class FindDicTermService implements IQueryHandler {
  private readonly redisClient: Redis;
  constructor(private readonly redisService: RedisService) {
    this.redisClient = redisService.getClient();
  }
  execute(query: FindDicTermQuery): Promise<any> {
    return this.redisClient.hgetall(query.key);
  }
}
