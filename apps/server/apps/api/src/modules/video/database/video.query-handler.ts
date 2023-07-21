import { from, lastValueFrom, map, mergeMap, pluck, toArray } from 'rxjs';
import { VideoServicePort } from './video.service.port';
import { AwsOpensearchService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/queries/v1/find-video/find-video.service';
import { IfindManyVideoResult } from '@Apps/modules/video/interface/find-many-video.interface';

export class VideoQueryHandler
  extends AwsOpensearchService
  implements VideoServicePort
{
  async findManyVideo(tag: string): Promise<string[]> {
    const searchQuery = {
      index: 'video',
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
      index: 'video',
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
}
