import { FindDicTermQuery } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.query';
import { FindDicTermAdapter } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.adapter';
import { FindDicTermRes } from '@Apps/modules/cache/v1/queries/find-dic-term/find-dic-term.res';
import { RedisClientService } from '@Apps/modules/cache/v1/infra/redis.client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindDicTermImplement
  extends RedisClientService
  implements FindDicTermAdapter
{
  findAll(options: FindDicTermQuery): Promise<FindDicTermRes> {
    return this.redisClient.hgetall(options.key);
  }
}
