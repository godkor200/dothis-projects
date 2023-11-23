import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { from, lastValueFrom, map } from 'rxjs';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { data } from '@Apps/modules/daily_views/queries/v2/find-daily-views/__dummy__/daily-view-dummy-data';
import { FindAccumulateVideoV2 } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';

export class ChannelHistoryQueryHandler
  extends AwsOpensearchConnetionService
  implements ChannelHistoryOutboundPort
{
  /**
   * 채널아이디로 채널의 히스토리를 불러온다.
   * ps: 현재 데이터 안정화 작업이 되지 않았으므로 이전에 데이터를 불러온다.
   * @param channelIds
   */
  async findChannelHistoryFullScan<T>(
    channelIds: string[],
    data?: CHANNEL_DATA_KEY[],
  ): Promise<T[]> {
    let searchQuery = {
      index: `new_channel_history`,
      scroll: '10s',
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                terms: {
                  channel_id: channelIds,
                },
              },
              /**
               * 지금 new-channel-history 인덱스를 사용하기 때문에 날짜가 의미가 없음
               *
               *
               *
               *
               {
                range: {
                  crawled_date: {
                    gte: fromDate + ' 00:00:00', // 시작 날짜 (greater than or equal)
                    lte: toDate + ' 00:00:00', // 종료 날짜 (less than or equal)
                  },
                },
              }
               */
            ],
          },
        },
        _source: data,
      },
    };
    return await this.fullScan<T>(searchQuery);
  }

  async findChannelHistoryByLimit(
    channelIds: string[],
    size: number,
    order: 'desc' | 'asc',
  ): Promise<IChannelHistoryRes[]> {
    let searchQuery = {
      index: `new_channel_history`,
      scroll: '10s',
      size,
      body: {
        query: {
          bool: {
            must: [
              {
                terms: {
                  channel_id: channelIds,
                },
              },
              /**
               * 지금 new-channel-history 인덱스를 사용하기 때문에 날짜가 의미가 없음
               *
               *
               *
               *
               {
               range: {
               crawled_date: {
               gte: fromDate + ' 00:00:00', // 시작 날짜 (greater than or equal)
               lte: toDate + ' 00:00:00', // 종료 날짜 (less than or equal)
               },
               },
               }
               */
            ],
          },
        },
        sort: [
          {
            crawled_date: {
              order,
            },
          },
        ],
      },
    };
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    ).pipe(map((hits) => hits.map((hit) => hit._source)));
    return await lastValueFrom(observable$);
  }

  async findChannelHistoryByKeywordAndRelWordFullScan<T>(
    props: FindAccumulateVideoV2,
  ): Promise<T[]> {
    return Promise.resolve([]);
  }
}
