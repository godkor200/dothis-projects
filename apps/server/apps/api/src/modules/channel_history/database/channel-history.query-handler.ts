import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { from, lastValueFrom, map } from 'rxjs';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { FindAccumulateVideoV2 } from '@Apps/modules/video/dtos/find-accumulate-videos.dtos';
import { ChannelHistoryDataService } from '@Apps/modules/channel_history/service/channel-history-data.service';
import { ConfigService } from '@nestjs/config';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';

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
                bool: {
                  should: [
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_tag: `*${relWord}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_tag: `*${keyword}*`,
                            },
                          },
                        ],
                      },
                    },
                    {
                      bool: {
                        must: [
                          {
                            wildcard: {
                              video_title: `*${relWord}*`,
                            },
                          },
                          {
                            wildcard: {
                              video_title: `*${keyword}*`,
                            },
                          },
                        ],
                      },
                    },
                  ],
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
export class ChannelHistoryQueryHandler
  extends AwsOpenSearchConnectionService
  implements ChannelHistoryOutboundPort
{
  constructor(
    private channelHistoryDataService: ChannelHistoryDataService,
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
    const { from, to, keyword, relationKeyword } = props;
    const index = this.channelHistoryDataService
      .generateDatesBetween(from, to)
      .join('channel-history-');
    const searchQuery = SearchQueryBuilder.channelHistory(
      index,
      keyword,
      relationKeyword,
      [
        CHANNEL_DATA_KEY.CHANNEL_AVERAGE_VIEWS,
        CHANNEL_DATA_KEY.CHANNEL_SEUBSCRIBERS,
        CHANNEL_DATA_KEY.VIDEO_LIST,
      ],
    );
    return await this.fullScan<T>(searchQuery);
  }
}
