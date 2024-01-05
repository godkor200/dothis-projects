import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { ChannelHistoryOutboundPort } from '@Apps/modules/channel_history/database/channel-history.outbound.port';
import { IChannelHistoryRes } from '@Apps/modules/channel_history/dtos/expected-views.res';
import { from, lastValueFrom, map } from 'rxjs';
import { CHANNEL_DATA_KEY } from '@Apps/modules/channel_history/dtos/expected-views.dtos';
import { ConfigService } from '@nestjs/config';
import { AwsCredentialsService } from '@Apps/config/aws/config/aws.config';
import { Injectable } from '@nestjs/common';
import { FindVideoV2 } from '@Apps/modules/video/interface/find-accumulate-videos.interface';
import { FindVideoChannelHistory } from '@Apps/modules/channel_history/dtos/channel-history.interface';

export class SearchQueryBuilder {
  static channelHistory(
    index: string,
    keyword: string,
    relWord: string,
    size: number,
    data: CHANNEL_DATA_KEY[],
    from?: Date,
    to?: Date,
  ) {
    const relWords = relWord?.split(/\s+/);
    let searchQuery = {
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
                      filter: [
                        {
                          multi_match: {
                            query: `${keyword}`,
                            fields: [
                              'video_list.video_tags',
                              'video_list.video_title',
                            ],
                          },
                        },
                        ...(relWords
                          ? relWords.map((word) => ({
                              multi_match: {
                                query: `${word}`,
                                fields: [
                                  'video_list.video_tags',
                                  'video_list.video_title',
                                ],
                              },
                            }))
                          : []),
                      ],
                    },
                  },
                  inner_hits: {
                    name: 'video_list',
                    size,
                  },
                },
              },
            ],
          },
        },
        _source: data || false,
      },
    };
    /**
     *  필요가 있을까?
     */
    if (from && to) {
      searchQuery.body.query.bool.must[0].nested.query.bool.filter.push({
        range: {
          'video_list.crawled_date': {
            gte: from + ' 00:00:00',
            lte: to + ' 23:59:59',
          },
        },
      } as any);
    }

    return searchQuery;
  }
  static findChannelInfo(channelId: string, designatedDate: string) {
    return {
      index: 'channel-history-' + designatedDate,
      id: channelId,
    };
  }
}

@Injectable()
export class ChannelHistoryQueryHandler
  extends AwsOpenSearchConnectionService
  implements ChannelHistoryOutboundPort
{
  constructor(
    configService: ConfigService,
    awsCredentialsService: AwsCredentialsService,
  ) {
    super(configService, awsCredentialsService);
  }

  async findChannelHistoryInfo(
    channelIds: string,
  ): Promise<IChannelHistoryRes> {
    const yesterday = new Date(Date.now() - 86400000); // 86400000ms = 1 day
    const designatedDate = `${yesterday.getFullYear()}-${String(
      yesterday.getMonth() + 1,
    ).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;
    const searchQuery = SearchQueryBuilder.findChannelInfo(
      channelIds,
      designatedDate,
    );
    const observable$ = from(
      this.client.get(searchQuery).then((res) => res.body._source),
    );

    return await lastValueFrom(observable$);
  }
  /**
   * 채널아이디로 채널의 히스토리를 불러온다.
   * ps: 어제자 channelhistory index에 적제된 데이터를 가져오면 최신화된 데이터를 가져올수 있음
   * @param channelIds
   * @param data 리턴 받을 데이터
   */

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
    const { keyword, relationKeyword, data, from, to } = props;

    const index = 'channel-history-*';
    const size = 100;
    const searchQuery = SearchQueryBuilder.channelHistory(
      index,
      keyword,
      relationKeyword,
      size,
      data,
      from,
      to,
    );
    return await this.fullScan<T>(searchQuery, (doc: any) => doc);
  }

  async scanLatestChannelHistoryByKeywordAndRelWord<T>(
    props: FindVideoChannelHistory,
  ): Promise<T[]> {
    const indexNames = await this.getIndices('channel-history*');
    const lastIndex = indexNames[0].index;
    const { keyword, relationKeyword, data } = props;
    const size = 100;
    const searchQuery = SearchQueryBuilder.channelHistory(
      lastIndex,
      keyword,
      relationKeyword,
      size,
      data,
    );

    return await this.fullScan<T>(searchQuery, (doc: any) => doc);
  }
}
