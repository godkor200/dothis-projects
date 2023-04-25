import { from, lastValueFrom, map, mergeMap, pluck, toArray } from 'rxjs';
import { VideoServicePort } from './video.service.port';
import { AwsOpensearchService } from '@Apps/common/aws/service/aws.opensearch.service';
import { error } from 'console';

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
}
