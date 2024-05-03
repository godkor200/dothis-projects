import { SetSearchTermOutboundPort } from '@Apps/modules/related-word/domain/ports/set-search-term.outbound.port';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from '@Apps/modules/related-word/application/dtos/set-dic-term.command';
import { RedisClientService } from '@Apps/modules/related-word/infrastructure/adapters/redis.client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SetDicTermImplement
  extends RedisClientService
  implements SetSearchTermOutboundPort
{
  setDicTerm(options: string[]): Promise<SetDicTermCommandOutput> {
    const hashkey = options
      .map((e, i) => `${i} ${e}`)
      .join(' ')
      .split(' ');

    return this.redisClient.hmset('dic-term', hashkey);
  }
}
