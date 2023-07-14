import { ChannelAdapter } from '@Apps/modules/channel/interface/channel.adapter';
import { AwsOpensearchService } from '@Apps/common/aws/service/aws.opensearch.service';
import { FindKeywordByUserResponseDto } from '@Apps/modules/channel/interface/find-keyword-byUser.response.dto';
import { from, lastValueFrom, map } from 'rxjs';

export class ChannelQueryHandler
  extends AwsOpensearchService
  implements ChannelAdapter
{
  async findChannelTagOrKeyword(
    channelId: string,
  ): Promise<FindKeywordByUserResponseDto> {
    const searchQuery = {
      index: 'channel',
      body: {
        query: {
          match: {
            channel_id: channelId,
          },
        },
        _source: ['channel_tags', 'channel_keywords'],
      },
    };
    const observable$ = from(
      this.client.search(searchQuery).then((res) => res.body.hits.hits),
    ).pipe(map((hits) => hits.map((hit) => hit._source)));

    return await lastValueFrom(observable$);
  }
}
