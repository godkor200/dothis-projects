import { IgniteService } from '@Apps/common/ignite/service/ignite.service';
import { Err, Ok } from 'oxide.ts';
import { TableNotFoundException } from '@Libs/commons/src/exceptions/exceptions';
import { ChannelHistoryNotFoundError } from '@Apps/modules/channel-history/domain/events/channel_history.error';
import { IgniteResultToObjectMapper } from '@Apps/common/ignite/mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelHistoryBaseAdapter {
  protected readonly keys: string[] = [
    'CHANNEL_ID',
    'CHANNEL_AVERAGE_VIEWS',
    'CHANNEL_SUBSCRIBERS',
    'CHANNEL_TOTAL_VIEWS',
    'CHANNEL_TOTAL_VIDEOS',
    'YEAR',
    'MONTH',
    'DAY',
  ];
  constructor(private readonly igniteService: IgniteService) {}

  protected async get<T>(
    tableName: string,
    queryString: string,
  ): Promise<
    Ok<T[]> | Err<ChannelHistoryNotFoundError | TableNotFoundException>
  > {
    try {
      const query = this.igniteService.createDistributedJoinQuery(queryString);

      const cache = await this.igniteService.getClient().getCache(tableName);

      const result = await cache.query(query);
      const res = await result.getAll();
      if (!res.length) {
        return Err(new ChannelHistoryNotFoundError());
      }
      return Ok(
        IgniteResultToObjectMapper.mapResultToObjects(res, queryString),
      );
    } catch (e) {
      if (e.message.includes('Table')) {
        return Err(new TableNotFoundException(e.message));
      }
      return Err(e);
    }
  }
}
