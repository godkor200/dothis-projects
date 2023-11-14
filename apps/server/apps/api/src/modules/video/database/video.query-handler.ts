import { from, last, lastValueFrom, map } from 'rxjs';
import {
  FindVideoByMultipleIndex,
  VideoServicePort,
} from './video.service.port';
import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import {
  IFindManyVideoResult,
  IPagingRes,
} from '@Apps/modules/video/interface/find-many-video.interface';

import { FindVideoPageQuery } from '@Apps/modules/video/queries/v1/find-video-paging/find-video-paging.req.dto';
import { FindVideoDateQuery } from '@Apps/modules/video/dtos/find-videos.dtos';
import { query } from 'express';

export class VideoQueryHandler
  extends AwsOpensearchConnetionService
  implements VideoServicePort
{
  async findVideosWithMultipleIndex<T>(
    arg: FindVideoByMultipleIndex,
  ): Promise<T[]> {
    const index = arg.cluster.map((e) => 'video-' + e).join(',');

    let searchQuery = {
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
                      wildcard: {
                        video_tag: `*${arg.keyword}*`,
                      },
                    },
                    {
                      wildcard: {
                        video_title: `*${arg.keyword}*`,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        _source: arg.data,
      },
    };
    if (arg.relWord)
      searchQuery.body.query.bool.must[0].bool.should.push(
        {
          wildcard: {
            video_tag: `*${arg.relWord}*`,
          },
        },
        {
          wildcard: {
            video_title: `*${arg.relWord}*`,
          },
        },
      );
    return await this.fullScan<T>(searchQuery);
  }
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

  /**
   * FIXME: 개선 해야됨,11/2 현재 템플릿 리터럴로 수정
   * @param query
   */
  async findvideoIdfullScanAndVideos<T>(
    query: FindVideoDateQuery,
  ): Promise<T[]> {
    let searchQuery = {
      index: 'video-' + query.clusterNumber,
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
                      wildcard: {
                        video_tag: `*${query.keyword}*`,
                      },
                    },
                    {
                      wildcard: {
                        video_title: `*${query.keyword}*`,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        _source: query.data,
      },
    };
    if (query.relationKeyword)
      searchQuery.body.query.bool.must[0].bool.should.push(
        {
          wildcard: {
            video_tag: `*${query.relationKeyword}*`,
          },
        },
        {
          wildcard: {
            video_title: `*${query.relationKeyword}*`,
          },
        },
      );
    return await this.fullScan<T>(searchQuery);
  }

  async findVideoPaging(arg: FindVideoPageQuery): Promise<IPagingRes> {
    const { clusterNumber, limit, search, related, last } = arg;
    let searchQuery = {
      index: `video-${clusterNumber}`,
      size: limit,
      body: {
        query: {
          bool: {
            must: [
              {
                bool: {
                  should: [
                    { wildcard: { video_tag: `*${search}*` } },
                    { wildcard: { video_title: `*${search}*` } },
                  ],
                },
              },
              // If related is not null or undefined
              ...(related
                ? [
                    {
                      bool: {
                        should: [
                          { wildcard: { video_tag: `*${related}*` } },
                          { wildcard: { video_title: `*${related}*` } },
                        ],
                      },
                    },
                  ]
                : []),
            ],
          },
        },
        sort: ['_id'],
      },
    };

    if (last) searchQuery.body['search_after'] = [last];

    const observable$ = from(
      this.client.search(searchQuery).then((res) => ({
        total: res.body.hits.total,
        data: res.body.hits.hits,
      })),
    );

    return await lastValueFrom(observable$);
  }
}
