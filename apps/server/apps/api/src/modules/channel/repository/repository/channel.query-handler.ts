import { ChannelAdapter } from '@Apps/modules/channel/interface/channel.adapter';
import { AwsOpensearchService } from '@Apps/common/aws/service/aws.opensearch.service';
import { from, lastValueFrom, map } from 'rxjs';
import { ChannelKeywordOrtagDtos } from '@Apps/modules/user/dtos/channel-keywordOrtag.dtos';

export class ChannelQueryHandler
  extends AwsOpensearchService
  implements ChannelAdapter
{
  async findChannelTagOrKeyword(
    channelId: string,
  ): Promise<ChannelKeywordOrtagDtos> {
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
