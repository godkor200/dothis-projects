import { IdocRes } from '@Apps/common/aws/interface/os.res.interface';
import { ChannelInfoOs } from '@Apps/modules/channel/interface/analyze-channel.interface';
import { undefined } from 'zod';

export interface ChannelQueryHandlerPort {
  findChannelName(channelId: string): Promise<string | undefined>;

  findChannelInfo(channelId: string): Promise<ChannelInfoOs>;
}
