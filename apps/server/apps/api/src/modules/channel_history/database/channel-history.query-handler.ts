import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { from, lastValueFrom, map } from 'rxjs';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';

import { ChannelHistoryDataService } from '@Apps/modules/channel_history/service/channel-history-data.service';
import { ConfigService } from '@nestjs/config';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';
import { Injectable } from '@nestjs/common';
import { FindVideoV2 } from '@Apps/modules/video/interface/find-accumulate-videos.interface';

export class SearchQueryBuilder {
  static channelHistory(
    index: string,
    keyword: string,
    relWord: string,
    data: CHANNEL_DATA_KEY[],
  ) {
    return {
      index,
      scroll: '10s',
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                nested: {
                  path: 'video_list',
                  query: {
                    bool: {
                      must: [
                        {
                          match: {
                            'video_list.video_tags': `${keyword}`,
                          },
                        },
                        {
                          match: {
                            'video_list.video_tags': `${relWord}`,
                          },
                        },
                        {
                          match: {
                            'video_list.video_title': `${keyword}`,
                          },
                        },
                        {
                          match: {
                            'video_list.video_title': `${relWord}`,
                          },
                        },
                      ],
                    },
                  },
                  inner_hits: {
                    name: 'video_list',
                  },
                },
              },
            ],
          },
        },
        _source: data,
      },
    };
  }
}
@Injectable()
export class ChannelHistoryQueryHandler
  extends AwsOpenSearchConnectionService
  implements ChannelHistoryOutboundPort
{
  constructor(
    private readonly channelHistoryDataService: ChannelHistoryDataService,
    configService: ConfigService,
    awsCredentialsService: AwsCredentialsService,
  ) {
    super(configService, awsCredentialsService);
  }
  /**
   * 채널아이디로 채널의 히스토리를 불러온다.
   * ps: 현재 데이터 안정화 작업이 되지 않았으므로 이전에 데이터를 불러온다.
   * @param channelIds
   * @param data 리턴 받을 데이터
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
    return await this.fullScan<T>(searchQuery, (doc) => doc._source);
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
    props: FindVideoV2,
  ): Promise<T[]> {
    const { from, to, keyword, relationKeyword, data } = props;
    /**
     * 데이터가 다 차면 사용할 로직
    const dates = this.channelHistoryDataService.generateDatesBetween(from, to);
    const index = dates
      .map((date, i) =>
        i === 0 ? `channel-history-${date}` : `,channel-history-${date}`,
      )
      .join('');
     */
    const index = 'channel-history-*';

    const searchQuery = SearchQueryBuilder.channelHistory(
      index,
      keyword,
      relationKeyword,
      data,
    );
    return await this.fullScan<T>(searchQuery, (doc: any) => doc);
  }
}
