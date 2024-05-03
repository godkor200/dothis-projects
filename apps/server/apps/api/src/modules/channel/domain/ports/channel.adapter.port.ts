import { ChannelKeywordOrtagDtos } from '@Apps/modules/user/dtos/channel-keywordOrtag.dtos';

export interface ChannelAdapterPort {
  findChannelTagOrKeyword: (
    channelId: string,
  ) => Promise<ChannelKeywordOrtagDtos>;
}
