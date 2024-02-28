import { ChannelQueryHandlerPort } from '@Apps/modules/channel/database/channel.query-handler.port';
import { AwsOpenSearchConnectionService } from '@Apps/common/aws/service/aws.opensearch.service';
import { CHANNEL_DATA } from '@Apps/modules/video/application/dtos/find-video.os.res';
import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';
import { ChannelInfoOs } from '@Apps/modules/channel/application/dtos/analyze-channel.interface';
import { ApiResponse } from '@opensearch-project/opensearch';

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

  async findChannelInfo(channelId: string): Promise<ChannelInfoOs> {
    try {
      const searchQuery = {
        index: 'channel_data',
        id: channelId,
      };
      const res: ApiResponse<IdocRes<ChannelInfoOs>> = await this.client.get(
        searchQuery,
      );
      return res.body._source;
    } catch (e) {
      console.log(e);
    }
  }
}
