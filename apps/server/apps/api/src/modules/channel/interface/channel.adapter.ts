import { ChannelKeywordOrtagDtos } from '@Apps/modules/user/dtos/channel-keywordOrtag.dtos';

export interface ChannelAdapter {
  findChannelTagOrKeyword: (
    channelId: string,
  ) => Promise<ChannelKeywordOrtagDtos>;
}
