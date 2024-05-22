import { FindDicTermQuery } from '@Apps/modules/related-word/application/dtos/find-dic-term.query';
import { FindSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/find-search-term.outbound.port';
import { FindSearchTermRes } from '@Apps/modules/related-word/domain/ports/find-search-term.res';
import { RedisClientService } from '@Apps/common/redis/service/redis.client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindDicTermImplement
  extends RedisClientService
  implements FindSearchTermOutboundPort
{
  findAll(options: FindDicTermQuery): Promise<FindSearchTermRes> {
    return this.redisClient.hgetall(options.key);
  }
}
