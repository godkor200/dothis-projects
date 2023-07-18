import { from, lastValueFrom, map, mergeMap, pluck, toArray } from 'rxjs';
import { VideoServicePort } from '../../interface/video.service.port';
import { AwsOpensearchService } from 'apps/api/src/common/aws/service/aws.opensearch.service';
import { FindVideoQuery } from '@Apps/modules/video/v1/find-video/find-video.service';

export class VideoService
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
  async findVideoByWords(words: FindVideoQuery) {
    const searchQuery = {
      index: 'video',
      body: {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  // video_tag: `*${tag}*`,
                },
              },
              {
                wildcard: {
                  // video_title: `*${tag}*`,
                },
              },
            ],
          },
        },
      },
    };
  }
}
