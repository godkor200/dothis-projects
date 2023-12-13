import { ChannelQueryHandlerPort } from '@Apps/modules/channel/database/channel.query-handler.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { CHANNEL_DATA } from '@Apps/modules/video/interface/find-video.os.res';

export class ChannelQueryHandler
  extends AwsOpenSearchConnectionService
  implements ChannelQueryHandlerPort
{
  async findChannelName(channelId: string): Promise<string | undefined> {
    try {
      const searchQuery = {
        index: 'channel_data',
        id: channelId,
        _source: [CHANNEL_DATA.CHANNEL_NAME],
      };
      const res = await this.client.get(searchQuery);
      return res.body._source?.channel_name;
    } catch (e) {
      if (e.statusCode == 404) return undefined;
    }
  }
}
