import { SetSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/set-search-term.outbound.port';
import { SetDicTermCommandOutput } from '@Apps/modules/related-word/application/dtos/set-dic-term.command';
import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class SetDicTermImplement implements SetSearchTermOutboundPort {
  constructor(@InjectRedis() private readonly redisClient: Redis) {}

  setDicTerm(options: string[]): Promise<SetDicTermCommandOutput> {
    const hashKey = options
      .map((e, i) => `${i} ${e}`)
      .join(' ')
      .split(' ');

    return this.redisClient.hmset('dic-term', hashKey);
  }
}
