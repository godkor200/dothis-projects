import { SetDicTermAdaptor } from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.adaptor';
import {
  SetDicTermCommand,
  SetDicTermCommandOutput,
} from '@Apps/modules/cache/v1/commands/set-dic-term/set-dic-term.command';
import { RedisClientService } from '@Apps/modules/cache/v1/infra/redis.client.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SetDicTermImplement
  extends RedisClientService
  implements SetDicTermAdaptor
{
  setDicTerm(options: string[]): Promise<SetDicTermCommandOutput> {
    const hashkey = options
      .map((e, i) => `${i} ${e}`)
      .join(' ')
      .split(' ');

    return this.redisClient.hmset('dic-term', hashkey);
  }
}
