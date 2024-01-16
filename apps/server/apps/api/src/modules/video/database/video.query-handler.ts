import { from, lastValueFrom, map } from 'rxjs';
import { VideoOutboundPort } from './video.outbound.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
  IVideo,
} from '@Apps/modules/video/interface/find-many-video.interface';
import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import {
  FindVideoDateQuery,
  VIDEO_DATA_KEY,
} from '@Apps/modules/video/dtos/find-videos.dtos';
import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';
import { VideoNotFoundError } from '@Apps/modules/video/domain/event/video.error';
import { Err } from 'oxide.ts';
import { FindVideoPageV2Query } from '@Apps/modules/video/queries/v2/find-video-paging/find-video-paging.req.dto';
import { ScrollApiError } from '@Apps/common/aws/domain/aws.os.error';
import { FindDailyViewsV3Dto } from '@Apps/modules/daily_views/dtos/find-daily-views.dtos';

export class SearchQueryBuilder {
  static video(
    index: string,
    keyword: string,
    relWord: string,
    data?: VIDEO_DATA_KEY[],
    from?: string,
    to?: string,
    size: number = 100,
  ) {
    const relWords = relWord.split(/\s+/);

    return {
      index,
      size: 10000,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  filter: [
                    {
                      bool: {
                        must: [
                          {
                            multi_match: {
                              query: keyword,
                              fields: ['video_tags', 'video_title'],
                            },
                          },
                          ...relWords.map((word) => ({
                            multi_match: {
                              query: word,
                              fields: ['video_tags', 'video_title'],
                            },
                          })),
                        ],
                      },
                    },
                  ],
                },
              },
              {
                nested: {
                  path: 'video_history',
                  query: {
                    range: {
                      'video_history.crawled_date': {
                        gte: `${from} 00:00:00`,
                        lte: `${to} 23:59:59`,
                      },
                    },
                  },
                  inner_hits: {
                    name: 'video_history',
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
  }

  static individualVideo(clusterNumber: string, id: string) {
    return {
      index: 'video-' + clusterNumber,
      id,
    };
  }

  static videoPage(
    cluster: string,
    limit: number,
    search: string,
    related: string,
    last: string,
  ) {
    const relWords = related.split(/\s+/);

    let searchQuery = {
      index: cluster,
      size: limit,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  filter: [
                    {
                      bool: {
                        must: [
                          {
                            multi_match: {
                              query: search,
                              fields: ['video_tags', 'video_title'],
                            },
                          },
                          ...relWords.map((word) => ({
                            multi_match: {
                              query: word,
                              fields: ['video_tags', 'video_title'],
                            },
                          })),
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        sort: ['_id'],
      },
    };

    if (last) searchQuery.body['search_after'] = [last];

    return searchQuery;
  }
}
export class VideoQueryHandler
  extends AwsOpenSearchConnectionService
  implements VideoOutboundPort
{
  async findManyVideo(tag: string): Promise<string[]> {
    const searchQuery = {
      index: 'new_video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  video_tag: `*${tag}*`,
                },
              },
              {
                wildcard: {
                  video_title: `*${tag}*`,
                },
              },
            ],
          },
        },
        _source: 'video_id',
      },
    };
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    ).pipe(map((hits) => hits.map((hit) => hit._source.video_id)));

    return await lastValueFrom(observable$);
  }
  async findVideoByWords(
    words: FindVideoQuery,
  ): Promise<IFindManyVideoResult[]> {
    let searchQuery = {
      index: 'new_video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  video_tag: `*${words.search}*`,
                },
              },
              {
                wildcard: {
                  video_title: `*${words.search}*`,
                },
              },
            ],
          },
        },
      },
    };
    if (words.related)
      searchQuery.body.query.bool.should.push(
        {
          wildcard: {
            video_tag: `*${words.related}*`,
          },
        },
        {
          wildcard: {
            video_title: `*${words.related}*`,
          },
        },
      );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    );

    return await lastValueFrom(observable$);
  }

  async findVideoIdFullScanAndVideos<T>(
    query: FindDailyViewsV3Dto,
  ): Promise<T[] | ScrollApiError> {
    const { clusterNumber, keyword, relationKeyword, data, from, to } = query;
    const searchQuery = SearchQueryBuilder.video(
      'video-' + clusterNumber,
      keyword,
      relationKeyword,
      data,
      from,
      to,
    );

    return await this.fullScan<T>(searchQuery, (doc) => doc);
  }

  async findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes> {
    const { clusterNumber, limit, search, related, last } = arg;
    const searchQuery = SearchQueryBuilder.videoPage(
      'video-' + clusterNumber,
      limit,
      search,
      related,
      last,
    );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }

  /**
   * 비디오 히스토리의 마지막을 찾아 리턴
   * @param arg
   */
  async findVideosWithLastVideoHistory<T>(
    arg: FindVideoDateQuery,
  ): Promise<T[] | ScrollApiError> {
    const { clusterNumber, keyword, relationKeyword } = arg;
    let searchQuery = SearchQueryBuilder.video(
      clusterNumber,
      keyword,
      relationKeyword,
    );
    return await this.fullScan<T>(searchQuery, (doc) => doc);
  }

  async findVideoInfo(
    clusterNumber: string,
    id: string,
  ): Promise<IdocRes<IVideo>> {
    const searchQuery = SearchQueryBuilder.individualVideo(clusterNumber, id);
    const observable$ = from(
      this.client
        .get(searchQuery)
        .then((res) => {
          if (res.body.found) {
            return res.body as IdocRes<IVideo>;
          }
        })
        .catch((err) => {
          if (!err.meta.body.found) return Err(new VideoNotFoundError());
          return err;
        }),
    );

    return await lastValueFrom(observable$);
  }

  async findVideoMultiIndexPaging(
    arg: FindVideoPageV2Query,
  ): Promise<IPagingRes> {
    const { search, related, last, limit } = arg;
    const multiIndex = arg.clusterNumbers
      .map((item) => 'video-' + item)
      .join(',');
    const searchQuery = SearchQueryBuilder.videoPage(
      multiIndex,
      limit,
      search,
      related,
      last,
    );
    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }
}
