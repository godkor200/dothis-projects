import { SetSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/set-search-term.outbound.port';
import { SetDicTermCommandOutput } from '@Apps/modules/related-word/application/dtos/set-dic-term.command';
import { RedisClientService } from '@Apps/common/redis/service/redis.client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SetDicTermImplement implements SetSearchTermOutboundPort {
  constructor(private readonly redisService: RedisClientService) {}

  setDicTerm(options: string[]): Promise<SetDicTermCommandOutput> {
    const hashKey = options
      .map((e, i) => `${i} ${e}`)
      .join(' ')
      .split(' ');

    return this.redisService.redisClient.hmset('dic-term', hashKey);
  }
}
