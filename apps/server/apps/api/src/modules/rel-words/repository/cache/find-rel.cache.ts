import { FindRelCachePort } from '@Apps/modules/rel-words/repository/cache/find-rel.cache.port';
import { RedisClientService } from '@Apps/modules/cache/infra/redis.client.service';
import { NotFoundException } from '@nestjs/common';

export class FindRelCache
  extends RedisClientService
  implements FindRelCachePort
{
  async findOneRelWord(keyword: string): Promise<string> {
    const result: string = await this.redisClient.get(keyword);
    if (!result) {
      throw new NotFoundException('not found');
    }
    return result;
  }
}
