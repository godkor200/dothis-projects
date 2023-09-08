import { from, lastValueFrom, map, mergeMap, pluck, toArray } from 'rxjs';
import { VideoServicePort } from './video.service.port';
import { AwsOpensearchConnetionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.query-handler';
import { IfindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';
import { FindDailyViewsQuery } from '@Apps/modules/daily_views/interface/find-daily-views.dto';

export class VideoQueryHandler
  extends AwsOpensearchConnetionService
  implements VideoServicePort
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
  ): Promise<IfindManyVideoResult[]> {
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

  async findvideoIdfullScanAndVideos(
    query: FindDailyViewsQuery,
  ): Promise<string[]> {
    console.log(query);
    let searchQuery = {
      index: 'video-6',
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
              {
                range: {
                  crawled_date: {
                    gte: query.from + ' 00:00:00', // 시작 날짜 (greater than or equal)
                    lte: query.to + ' 00:00:00', // 종료 날짜 (less than or equal)
                  },
                },
              },
            ],
          },
        },
        _source: ['video_id'],
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
    const res = await this.fullScan(searchQuery);
    const observable: string[] = res.map((e) => e.video_id);

    return await observable;
  }
}
